import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import FootballGameCard from "@/components/football/football-game-card";
import FootballGameServer from "@/components/football/football-game-server";
import prisma from "@/lib/db";
import { FootballFixture } from "@prisma/client";
import { cn } from "@/lib/utils";
import FootballFilters from "@/components/football/football-filters";
import {
  FixtureStatus,
  FootballGames,
  FootballFixtures,
} from "@/prisma/football-types";
import createFootballFixtureByLeague from "@/utils/football/create-football-fixture-by-league";
import { revalidatePath } from "next/cache";

import FetchDbFixtures from "@/components/football/fetch-db-fixtures";
import { Suspense } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const whitelistedLeaguesId = [1, 2, 3, 4, 6];

import { addFixtureLeague } from "@/utils/football/add-fixture-league";

// export const revalidate = 21600;

export async function generateMetadata() {
  const leagueNumbers = [1, 2, 3, 4, 6, 9, 39, 61, 71];

  try {
    leagueNumbers.forEach(async (leagueNumber) => {
      await addFixtureLeague(leagueNumber);
    });
  } catch (error) {
    console.error("Failed to fetch fixtures from API", error);
  }

  return {
    title: "Football Fixtures",
  };
}

export default async function FootballPage({ searchParams }: Props) {
  const league = searchParams.league;

  const leagueNumbers = league
    ? Array.isArray(league)
      ? league.map(Number)
      : [Number(league)]
    : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchDbFixtures leagueNumbers={leagueNumbers} />
    </Suspense>
  );
}

// export default async function FootballPage({ searchParams }: Props) {
//   const league = searchParams.league;
//   // let fixtures;
//   // if (league) {
//   //   const leagueNumbers = Array.isArray(league)
//   //     ? league.map(Number)
//   //     : [Number(league)];

//   //   console.log(leagueNumbers);

//   //   // // Fetch and cache fixtures for each league and create them in the database
//   //   // leagueNumbers.forEach(async (leagueNumber) => {
//   //   //   if (isNaN(leagueNumber)) {
//   //   //     throw new Error("Invalid league number");
//   //   //   }
//   //   //   const response = await fetch(
//   //   //     `https://api-football-v1.p.rapidapi.com/v3/fixtures?next=50&league=${league}`,
//   //   //     {
//   //   //       headers: {
//   //   //         "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
//   //   //         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//   //   //       } as Record<string, string>,
//   //   //       next: { revalidate: 21600 },
//   //   //     }
//   //   //   ).then((res) => res.json());

//   //   //   const parsedFixtures = FootballGames.parse(response.response);
//   //   //   const success = await createFootballFixtureByLeague(parsedFixtures);
//   //   //   // success ? revalidatePath("/football") : null;
//   //   // });

//   //   console.log("League specified");

//   //   fixtures = await prisma.footballFixture.findMany({
//   //     where: {
//   //       league: {
//   //         id: {
//   //           in: leagueNumbers,
//   //         },
//   //       },
//   //     },
//   //     orderBy: {
//   //       date: "asc",
//   //     },
//   //     include: {
//   //       league: true,
//   //       homeTeam: true,
//   //       awayTeam: true,
//   //       score: true,
//   //     },
//   //   });
//   // } else {
//   //   console.log("No league specified");
//   //   fixtures = await prisma.footballFixture.findMany({
//   //     orderBy: {
//   //       date: "asc",
//   //     },
//   //   });
//   // }

//   // console.log(fixtures);

//   // Filter out fixtures that are not yet started
//   // fixtures = fixtures.filter((fixture) => {
//   //   const status = fixture.status as FixtureStatus;
//   //   return status.short === "NS" ? fixture : null;
//   // });

//   // return (
//   //   <div className="p-4 h-full flex flex-col">
//   //     <Card className="p-4 flex-none rounded-2xl mb-4">
//   //       <div className="flex items-center">
//   //         <div className="flex-grow">Football</div>
//   //         <div className="ml-auto">
//   //           <FootballFilters />
//   //         </div>
//   //       </div>
//   //     </Card>
//   //     <ScrollArea className="flex-1">
//   //       <div className="grid grid-cols-1 gap-4">
//   //         {/* <FootballGameServer id={fixtures[1].id} /> */}
//   //         {fixtures.length ? (
//   //           fixtures.map((fixture: FootballFixture) => (
//   //             // <FootballGameCard key={fixture.id} id={fixture.id} />
//   //             <FootballGameServer key={fixture.id} id={fixture.id} />
//   //           ))
//   //         ) : (
//   //           <div className={cn("text-center", "text-gray-500")}>
//   //             No fixtures found
//   //           </div>
//   //         )}
//   //         {/* <FootballGameCard id={fixtures[0].id} /> */}
//   //       </div>
//   //     </ScrollArea>
//   //   </div>
//   // );

//   // return <div className="flex1"></div>;
// }
