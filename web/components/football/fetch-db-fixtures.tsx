import prisma from "@/lib/db";
import { FootballFixture } from "@prisma/client";
import { FixtureStatus } from "@/prisma/football-types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import FootballGameServer from "@/components/football/football-game-server";
import FootballFilters from "./football-filters";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

type FetchDbFixturesProps = {
  leagueNumbers: number[];
};

export default async function FetchDbFixtures({
  leagueNumbers,
}: FetchDbFixturesProps) {
  let fixtures;
  if (leagueNumbers.length > 0) {
    fixtures = await prisma.footballFixture.findMany({
      where: {
        league: {
          id: {
            in: leagueNumbers,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
      include: {
        league: true,
        homeTeam: true,
        awayTeam: true,
        score: true,
      },
    });
  } else {
    console.log("No league specified");
    fixtures = await prisma.footballFixture.findMany({
      orderBy: {
        date: "asc",
      },
    });
  }

  fixtures = fixtures.filter((fixture) => {
    const status = fixture.status as FixtureStatus;
    return status.short === "NS" ? fixture : null;
  });

  return (
    <div className="p-4 h-full flex flex-col">
      <Card className="p-4 flex-none rounded-2xl mb-4">
        <div className="flex items-center">
          <div className="flex-grow">Football</div>
          <div className="ml-auto">
            <FootballFilters />
          </div>
        </div>
      </Card>
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 gap-4">
          {fixtures.length ? (
            fixtures.map((fixture: FootballFixture) => (
              <Suspense key={fixture.id} fallback={<div>Loading...</div>}>
                <FootballGameServer id={fixture.id} />
              </Suspense>
            ))
          ) : (
            <div className={cn("text-center", "text-gray-500")}>
              No fixtures found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
