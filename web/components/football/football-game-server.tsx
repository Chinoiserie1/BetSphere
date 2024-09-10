import { Suspense } from "react";
import prisma from "@/lib/db";
import FootballGameClient from "./football-game-client";
import FootballGameCard from "./football-game-card";
import GameCard from "./game-card";
import GameClient from "./game-client";
import { addFixtureId } from "@/utils/football/add-fixture-id";
import {
  getDbFixture,
  getDbFixtureCached,
} from "@/utils/football/get-db-fixture";
import { revalidateTag } from "next/cache";

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
  // let fixture = await prisma.footballFixture.findUnique({
  //   where: { id },
  //   include: {
  //     league: true,
  //     homeTeam: true,
  //     awayTeam: true,
  //     score: true,
  //   },
  // });
  let fixture = await getDbFixtureCached(id);

  if (!fixture) {
    return <div>Fixture not found</div>;
  }

  const current = new Date().getTime() / 1000;
  const status = fixture.status as FixtureStatus;

  if (
    fixture.timestamp <= current &&
    (status.short === "NS" ||
      status.short === "1H" ||
      status.short === "HT" ||
      status.short === "2H" ||
      status.short === "ET" ||
      status.short === "BT" ||
      status.short === "INT" ||
      status.short === "P")
  ) {
    console.log("Fixture started, updating...");
    fixture = await addFixtureId(fixture);
    console.log(fixture);
    revalidateTag(`fixture-${id}`);
  }

  if (!fixture) {
    return <div>Fixture not found</div>;
  }

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
      {/* <GameClient fixtureProps={fixture} /> */}
      <GameCard fixture={fixture} />
    </Suspense>
  );
}
