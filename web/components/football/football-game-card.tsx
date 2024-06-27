import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import prisma from "@/lib/db";

type FootballGameCardProps = {
  id: number;
};

type FixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export default async function FootballGameCard({ id }: FootballGameCardProps) {
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
    return <></>;
  }

  const status = fixture.status as FixtureStatus;

  return (
    <Card key={fixture.id} className="p-4 rounded-2xl">
      <CardHeader className={cn("p-2")}>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <Avatar className="h-6 w-6">
              <AvatarImage src={fixture.league.logo} alt="Logo" />
            </Avatar>
            {fixture.league.flag && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={fixture.league.flag} alt="Logo" />
              </Avatar>
            )}
            <span className="ml-2 text-sm font-semibold">
              {fixture.league.country} - {fixture.league.name}
            </span>
          </div>
          <span className="text-xs pt-2">status: {status.long}</span>
        </div>
      </CardHeader>
      <CardContent className={cn("p-6")}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-semibold text-center">
              {fixture.homeTeam.name}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-center">
              {fixture.awayTeam.name}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-semibold text-center">
              {fixture.goalsHome}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-center">
              {fixture.goalsAway}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
