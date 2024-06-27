"use client";

import { useState, useEffect, use } from "react";
import { Prisma } from "@prisma/client";
import GameCard from "./game-card";

type FixtureStatus = {
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

type FootballFixture = Prisma.FootballFixtureGetPayload<
  typeof FootballFixtureWithRelations
>;

type FootballGameClientProps = {
  fixtureProps: FootballFixture;
};

export default function GameClient({ fixtureProps }: FootballGameClientProps) {
  const [fixture, setFixture] = useState<FootballFixture>(fixtureProps);
  const [clear, setClear] = useState(false);

  const id = fixture.id;

  const updateFixture = async () => {
    const res = await fetch(`/api/update-football-fixture?id=${id}`);
    const data = await res.json();
    setFixture(data.fixture);
  };

  const status = fixture.status as FixtureStatus;
  const shortStatus = status.short;

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date().getTime() / 1000;
      console.log("current", current);
      console.log("fixture.timestamp", fixture.timestamp);
      if (
        shortStatus === "FT" ||
        shortStatus === "AET" ||
        shortStatus === "PEN"
      ) {
        setClear(true);
        return;
      }
      if (current >= fixture.timestamp) {
        updateFixture();
      }
    }, 60000);

    if (clear) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [shortStatus, fixture.timestamp, clear]);

  return <GameCard fixture={fixture} />;
}
