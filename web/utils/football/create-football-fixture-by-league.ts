// add fixtures to the database
import "server-only";
import { FootballFixtures } from "../../prisma/football-types";
import prisma from "@/lib/db";

export default async function createFootballFixtureByLeague(
  footballFixtures: FootballFixtures
) {
  try {
    for (const fixture of footballFixtures) {
      // Create or update the fixture in the database
      const league = await prisma.footballLeague.upsert({
        where: { id: fixture.league.id },
        update: {
          logo: fixture.league.logo,
          flag: fixture.league.flag,
          country: fixture.league.country,
          name: fixture.league.name,
          round: fixture.league.round,
        },
        create: {
          id: fixture.league.id,
          logo: fixture.league.logo,
          flag: fixture.league.flag,
          country: fixture.league.country,
          name: fixture.league.name,
          round: fixture.league.round,
        },
      });

      const homeTeam = await prisma.footballTeam.upsert({
        where: { id: fixture.teams.home.id },
        update: {
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo,
          winner: fixture.teams.home.winner,
        },
        create: {
          id: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo,
          winner: fixture.teams.home.winner,
        },
      });

      const awayTeam = await prisma.footballTeam.upsert({
        where: { id: fixture.teams.away.id },
        update: {
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo,
          winner: fixture.teams.away.winner,
        },
        create: {
          id: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo,
          winner: fixture.teams.away.winner,
        },
      });

      const score = await prisma.footballScore.create({
        data: {
          halftime: fixture.score.halftime,
          fulltime: fixture.score.fulltime,
          extratime: fixture.score.extratime,
          penalty: fixture.score.penalty,
        },
      });

      await prisma.footballFixture.upsert({
        where: { id: fixture.fixture.id },
        update: {
          date: new Date(fixture.fixture.date),
          timestamp: fixture.fixture.timestamp,
          status: fixture.fixture.status,
          footballLeagueId: league.id,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          goalsHome: fixture.goals.home,
          goalsAway: fixture.goals.away,
          footballScoreId: score.id,
        },
        create: {
          id: fixture.fixture.id,
          date: new Date(fixture.fixture.date),
          timestamp: fixture.fixture.timestamp,
          status: fixture.fixture.status,
          footballLeagueId: league.id,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          goalsHome: fixture.goals.home,
          goalsAway: fixture.goals.away,
          footballScoreId: score.id,
        },
      });
    }

    console.log("Fixtures stored successfully.");
    return true;
  } catch (error) {
    return false;
  }
}
