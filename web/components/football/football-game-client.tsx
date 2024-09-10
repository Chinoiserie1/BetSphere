"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import GameCard from "./game-card";

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
  id: number;
};

type FixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export default function FootballGameClient({ id }: FootballGameClientProps) {
  const [fixture, setFixture] = useState<FootballFixture | null>(null);
  const [clear, setClear] = useState(false);

  const fetchFixture = async () => {
    const res = await fetch(`/api/update-football-fixture?id=${id}`);
    const data = await res.json();
    if (data.message != "Fixture updated") {
      console.log("clear interval");
      setClear(true);
      return;
    }
    setFixture(data.fixture);
  };

  useEffect(() => {
    fetchFixture();
    const interval = setInterval(() => {
      fetchFixture();
    }, 15000); // Fetch every 15 seconds

    if (clear) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [clear]);

  if (!fixture) {
    console.log("no fixture");
    return <></>;
  }

  const status = fixture.status as FixtureStatus;

  return (
    // <Card key={fixture.id} className="p-4 rounded-2xl">
    //   <CardHeader className={cn("p-2")}>
    //     <div className="flex flex-col">
    //       <div className="flex flex-row">
    //         <Avatar className="h-6 w-6">
    //           <AvatarImage src={fixture.league.logo} alt="Logo" />
    //         </Avatar>
    //         {fixture.league.flag && (
    //           <Avatar className="h-6 w-6">
    //             <AvatarImage src={fixture.league.flag} alt="Logo" />
    //           </Avatar>
    //         )}
    //         <span className="ml-2 text-sm font-semibold">
    //           {fixture.league.country} - {fixture.league.name}
    //         </span>
    //       </div>
    //       <span className="text-xs pt-2">status: {status.long}</span>
    //     </div>
    //   </CardHeader>
    //   <CardContent className={cn("p-6")}>
    //     <div className="grid grid-cols-2 gap-4">
    //       <div>
    //         <div className="text-lg font-semibold text-center">
    //           {fixture.homeTeam.name}
    //         </div>
    //       </div>
    //       <div>
    //         <div className="text-lg font-semibold text-center">
    //           {fixture.awayTeam.name}
    //         </div>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-2 gap-4">
    //       <div>
    //         <div className="text-lg font-semibold text-center">
    //           {fixture.goalsHome}
    //         </div>
    //       </div>
    //       <div>
    //         <div className="text-lg font-semibold text-center">
    //           {fixture.goalsAway}
    //         </div>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
    <GameCard fixture={fixture} />
  );
}
