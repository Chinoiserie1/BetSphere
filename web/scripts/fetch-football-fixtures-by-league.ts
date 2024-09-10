import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const FootballGameFixture = z.object({
  id: z.number(),
  date: z.string().datetime({ offset: true }),
  timestamp: z.number(),
  status: z.object({
    long: z.string(),
    short: z.string(),
    elapsed: z.number().nullable(),
  }),
});

const FootballGameLeague = z.object({
  id: z.number(),
  logo: z.string().url(),
  flag: z.string().url().nullable(),
  country: z.string(),
  name: z.string(),
  round: z.string().nullable(),
});

const FootballGameTeam = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string(),
  winner: z.boolean().nullable(),
});

const FootballGameGoal = z.number().nullable();

const FootballGameScore = z.object({
  home: FootballGameGoal,
  away: FootballGameGoal,
});

export const FootballGame = z.object({
  fixture: FootballGameFixture,
  league: FootballGameLeague,
  teams: z.object({
    home: FootballGameTeam,
    away: FootballGameTeam,
  }),
  goals: FootballGameScore,
  score: z.object({
    halftime: FootballGameScore,
    fulltime: FootballGameScore,
    extratime: FootballGameScore,
    penalty: FootballGameScore,
  }),
});

export const FootballGames = z.array(FootballGame);

export type FootballGameProps = z.infer<typeof FootballGame>;

const prisma = new PrismaClient();

export default async function fetchFootballFixturesByLeague(league: number) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?next=50&league=${league}`,
      {
        headers: {
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        } as Record<string, string>,
        cache: "force-cache",
        next: { revalidate: 21600 },
      }
    ).then((res) => res.json());

    const parsedFixtures = FootballGames.parse(response.response);

    for (const fixture of parsedFixtures) {
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

    console.log("Fixtures fetched and stored successfully.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
