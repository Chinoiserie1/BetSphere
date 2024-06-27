import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import FootballGameCard from "@/components/football/football-game-card";
import FootballGameServer from "@/components/football/football-game-server";
import prisma from "@/lib/db";
import { FootballFixture } from "@prisma/client";
import { cn } from "@/lib/utils";
import FootballFilters from "@/components/football/football-filters";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FootballPage({ searchParams }: Props) {
  const league = searchParams.league;
  let fixtures;
  if (league) {
    const leagueNumbers = Array.isArray(league)
      ? league.map(Number)
      : [Number(league)];

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
    });
  } else {
    fixtures = await prisma.footballFixture.findMany({
      orderBy: {
        date: "asc",
      },
    });
  }

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
          {/* <FootballGameServer id={fixtures[1].id} /> */}
          {fixtures.map((fixture: FootballFixture) => (
            // <FootballGameCard key={fixture.id} id={fixture.id} />
            <FootballGameServer key={fixture.id} id={fixture.id} />
          ))}
          {/* <FootballGameCard id={fixtures[0].id} /> */}
        </div>
      </ScrollArea>
    </div>
  );

  // return <div className="flex1"></div>;
}
