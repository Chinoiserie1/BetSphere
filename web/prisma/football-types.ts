import { Prisma } from "@prisma/client";
import { z } from "zod";

export const FootballGameFixture = z.object({
  id: z.number(),
  date: z.string().datetime({ offset: true }),
  timestamp: z.number(),
  status: z.object({
    long: z.string(),
    short: z.string(),
    elapsed: z.number().nullable(),
  }),
});

export const FootballGameLeague = z.object({
  id: z.number(),
  logo: z.string().url(),
  flag: z.string().url().nullable(),
  country: z.string(),
  name: z.string(),
  round: z.string().nullable(),
});

export const FootballGameTeam = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string(),
  winner: z.boolean().nullable(),
});

export const FootballGameGoal = z.number().nullable();

export const FootballGameScore = z.object({
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
export type FootballFixtures = z.infer<typeof FootballGames>;

export type FixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

const FootballFixtureWithRelations =
  Prisma.validator<Prisma.FootballFixtureDefaultArgs>()({
    include: {
      league: true,
      homeTeam: true,
      awayTeam: true,
      score: true,
    },
  });

export type FootballFixture = Prisma.FootballFixtureGetPayload<
  typeof FootballFixtureWithRelations
>;
