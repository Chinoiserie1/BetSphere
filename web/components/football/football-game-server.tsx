import { Suspense } from "react";
import prisma from "@/lib/db";
import FootballGameClient from "./football-game-client";
import FootballGameCard from "./football-game-card";
import GameCard from "./game-card";
import GameClient from "./game-client";

type FootballGameServerProps = {
  id: number;
};

type FixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export default async function FootballGameServer({
  id,
}: FootballGameServerProps) {
  const fixture = await prisma.footballFixture.findUnique({
    where: { id },
    include: {
      league: true,
      homeTeam: true,
      awayTeam: true,
      score: true,
    },
  });

  if (!fixture) {
    return <div>Fixture not found</div>;
  }

  // const current = new Date().getTime() / 1000;
  // const status = fixture.status as FixtureStatus;

  // if (
  //   fixture.timestamp > current ||
  //   status.short === "FT" ||
  //   status.short === "AET" ||
  //   status.short === "PEN"
  // ) {
  //   return <GameCard fixture={fixture} />;
  // }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <FootballGameClient id={id} /> */}
      <GameClient fixtureProps={fixture} />
    </Suspense>
  );
}
