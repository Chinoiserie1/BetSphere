import { Prisma } from "@prisma/client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ShineBorderHover from "@/components/magicui/shine-border-hover";

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

type FixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export default function GameCard({ fixture }: { fixture: FootballFixture }) {
  const status = fixture.status as FixtureStatus;

  const date = fixture.date;

  const fixtureDate = new Date(fixture.date);
  const now = new Date();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const isToday =
    fixtureDate.toLocaleDateString("en-US", { timeZone: userTimeZone }) ===
    now.toLocaleDateString("en-US", { timeZone: userTimeZone });
  const isTomorrow =
    fixtureDate.toLocaleDateString("en-US", { timeZone: userTimeZone }) ===
    new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      timeZone: userTimeZone,
    });

  const renderDate = () => {
    if (isToday) {
      return `${fixtureDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: userTimeZone,
      })}`;
    } else if (isTomorrow) {
      return `Tomorrow at ${fixtureDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: userTimeZone,
      })}`;
    } else {
      return fixtureDate.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
        hourCycle: "h23",
        timeZone: userTimeZone,
      });
    }
  };

  return (
    <Link href={`/football/${fixture.id}`}>
      {/* <Card key={fixture.id} className="p-4 rounded-2xl"> */}
      <Card className="rounded-2xl">
        <ShineBorderHover
          borderRadius={14}
          className="w-full"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
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
            <div className="text-center p-2">{renderDate()}</div>
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
        </ShineBorderHover>
      </Card>
    </Link>
  );
}
