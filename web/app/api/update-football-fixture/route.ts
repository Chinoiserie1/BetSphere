import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { FootballGame } from "@/scripts/fetch-football-fixtures";

type FixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Fixture ID is required" },
      { status: 400 }
    );
  }

  const fixture = await prisma.footballFixture.findUnique({
    where: { id: Number(id) },
    include: {
      league: true,
      homeTeam: true,
      awayTeam: true,
      score: true,
    },
  });

  if (!fixture) {
    return NextResponse.json({ error: "Fixture not found" }, { status: 404 });
  }

  const current = new Date().getTime() / 1000;
  const status = fixture.status as FixtureStatus;

  if (fixture.timestamp > current) {
    return NextResponse.json({ message: "Fixture is in the future", fixture });
  }

  if (
    status.short === "FT" ||
    status.short === "AET" ||
    status.short === "PEN"
  ) {
    return NextResponse.json({
      message: "Fixture is already finished",
      fixture,
    });
  }

  if (
    status.short == "NS" ||
    status.short == "TBD" ||
    status.short == "1H" ||
    status.short == "HT" ||
    status.short == "2H" ||
    status.short == "ET" ||
    status.short == "P" ||
    status.short == "BT" ||
    status.short == "LIVE"
  ) {
    const currentFixture = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${id}`,
      {
        headers: {
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY as string,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    const updatedFixture = FootballGame.parse(currentFixture.response[0]);

    const league = await prisma.footballLeague.update({
      where: { id: updatedFixture.league.id },
      data: {
        logo: updatedFixture.league.logo,
        flag: updatedFixture.league.flag,
        country: updatedFixture.league.country,
        name: updatedFixture.league.name,
        round: updatedFixture.league.round,
      },
    });

    const homeTeam = await prisma.footballTeam.update({
      where: { id: updatedFixture.teams.home.id },
      data: {
        name: updatedFixture.teams.home.name,
        logo: updatedFixture.teams.home.logo,
        winner: updatedFixture.teams.home.winner,
      },
    });

    const awayTeam = await prisma.footballTeam.update({
      where: { id: updatedFixture.teams.away.id },
      data: {
        name: updatedFixture.teams.away.name,
        logo: updatedFixture.teams.away.logo,
        winner: updatedFixture.teams.away.winner,
      },
    });

    const score = await prisma.footballScore.update({
      where: { id: fixture.score.id },
      data: {
        halftime: updatedFixture.score.halftime,
        fulltime: updatedFixture.score.fulltime,
        extratime: updatedFixture.score.extratime,
        penalty: updatedFixture.score.penalty,
      },
    });

    const updatedFixtureData = await prisma.footballFixture.update({
      where: { id: updatedFixture.fixture.id },
      data: {
        date: new Date(updatedFixture.fixture.date),
        timestamp: updatedFixture.fixture.timestamp,
        status: updatedFixture.fixture.status,
        footballLeagueId: league.id,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        goalsHome: updatedFixture.goals.home,
        goalsAway: updatedFixture.goals.away,
        footballScoreId: score.id,
      },
      include: {
        league: true,
        homeTeam: true,
        awayTeam: true,
        score: true,
      },
    });

    return NextResponse.json({
      message: "Fixture updated",
      fixture: updatedFixtureData,
    });
  }

  return NextResponse.json({ message: "No update needed", fixture });
}
