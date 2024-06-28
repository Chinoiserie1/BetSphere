// fetch and add fixtures to the database
import "server-only";
import { FootballGame, FootballFixture } from "@/prisma/football-types";
import prisma from "@/lib/db";

export async function addFixtureId(fixture: FootballFixture) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixture.id}`,
      {
        headers: {
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY as string,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
        next: { revalidate: 3600 },
      }
    ).then((res) => res.json());

    const updatedFixture = FootballGame.parse(response.response[0]);

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
    return updatedFixtureData;
  } catch (error) {
    console.error(`Error add fixture id: ${fixture.id} `, error);
    return null;
  }
}
