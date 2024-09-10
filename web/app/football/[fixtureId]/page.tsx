import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { FixtureStatus } from "@/prisma/football-types";
import { getDbFixtureCached } from "@/utils/football/get-db-fixture";

import Fixture from "@/components/football/fixture";
import WinnerOddsCard from "@/components/football/winner-odds-card";

type FixtureIdPageProps = {
  params: { fixtureId: string };
};

export default async function FixtureIdPage({ params }: FixtureIdPageProps) {
  // const fixture = await prisma.footballFixture.findUnique({
  //   where: { id: Number(params.fixtureId) },
  //   include: {
  //     league: true,
  //     homeTeam: true,
  //     awayTeam: true,
  //     score: true,
  //   },
  // });
  const fixture = await getDbFixtureCached(Number(params.fixtureId));

  if (!fixture) {
    return <div>Fixture not found</div>;
  }

  const status = fixture.status as FixtureStatus;

  if (
    status.short === "FT" ||
    status.short === "AET" ||
    status.short === "PEN"
  ) {
    return (
      <div className="text-2xl text-center flex items-center justify-center w-full h-full">
        Fixture ended
      </div>
    );
  }

  return (
    <>
      <Card className="p-6 mt-4">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <div className="flex-1 w-auto flex justify-start sm:justify-end items-center">
            <span>{fixture.homeTeam.name}</span>
            <Avatar className="h-6 w-6 ml-2 border">
              <AvatarImage src={fixture.homeTeam.logo} alt="Logo" />
            </Avatar>
          </div>
          <div className="py-2 sm:py-0 px-2 text-center flex-none">vs</div>
          <div className="flex-1 flex justify-end sm:justify-start items-center">
            <Avatar className={cn("h-6 w-6 mr-2 border")}>
              <AvatarImage src={fixture.awayTeam.logo} alt="Logo" />
            </Avatar>
            <span>{fixture.awayTeam.name}</span>
          </div>
        </div>
      </Card>

      <WinnerOddsCard
        fixtureId={fixture.id}
        fixtureTimestamp={fixture.timestamp}
        teamsNames={{
          home: fixture.homeTeam.name,
          away: fixture.awayTeam.name,
        }}
      />
    </>
  );
}
