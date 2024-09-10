"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useReadWeb3FootballBet } from "@/hooks/use-read-web3-football";
import { useEffect, useState } from "react";
import { winnerCondition, maxDirection } from "@/lib/football-constant";

import BetButton from "./bet-button";
import CreateBetButton from "./create-bet-button";

type OddsCardProps = {
  fixtureId: number;
  fixtureTimestamp: number;
  teamsNames: {
    home: string;
    away: string;
  };
};

export default function WinnerOddsCard({
  fixtureId,
  fixtureTimestamp,
  teamsNames,
}: OddsCardProps) {
  const { getComputedBetId, getBetInfo, getFootballFixtureURL, getOdds } =
    useReadWeb3FootballBet();
  const [betInfo, setBetInfo] = useState<any>();
  const [odds, setOdds] = useState<any>();
  const [betId, setBetId] = useState<bigint>();
  const [betCreated, setBetCreated] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const url = getFootballFixtureURL(fixtureId);
      const betId = await getComputedBetId(winnerCondition, url, maxDirection);
      const betInfo = await getBetInfo(betId);
      const odds = await getOdds(betId);
      betInfo[0] != 0 ? setBetCreated(true) : null;
      setBetInfo(betInfo);
      setOdds(odds);
      setBetId(betId);
    };
    init();
  }, [betCreated]);

  const isBetDisabled = betCreated ? false : true;

  const homeOdds = odds && betInfo[1] != 0 ? Number(odds[0]) : 0;
  const drawOdds = odds && betInfo[1] != 0 ? Number(odds[1]) : 0;
  const awayOdds = odds && betInfo[1] != 0 ? Number(odds[2]) : 0;

  return (
    <Card className={cn("p-4 mt-4")}>
      <CardHeader className={cn("p-0")}>
        <div className="flex flex-row">
          <span className="flex text-sm items-center font-medium leading-none">
            Winner
          </span>
          {betCreated ? null : (
            <div className="ml-auto">
              {betId ? (
                <CreateBetButton
                  betId={betId}
                  fixtureId={fixtureId}
                  fixtureTimestamp={fixtureTimestamp}
                  teamsName={teamsNames}
                  setBetCreated={setBetCreated}
                />
              ) : null}
            </div>
          )}
        </div>
      </CardHeader>
      <Separator className="mt-2" />
      <CardContent className={cn("p-0 pt-4 w-full")}>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            {betId ? (
              <BetButton
                betId={betId}
                teamsName={teamsNames.home}
                betDirection={1}
                fixtureId={fixtureId}
                fixtureTimestamp={0}
                isBetDisabled={isBetDisabled}
              />
            ) : null}
          </div>
          <div className="flex-1">
            {betId ? (
              <BetButton
                betId={betId}
                teamsName="Draw"
                betDirection={2}
                fixtureId={fixtureId}
                fixtureTimestamp={0}
                isBetDisabled={isBetDisabled}
              />
            ) : null}
          </div>
          <div className="flex-1">
            {betId ? (
              <BetButton
                betId={betId}
                teamsName={teamsNames.away}
                betDirection={3}
                fixtureId={fixtureId}
                fixtureTimestamp={0}
                isBetDisabled={isBetDisabled}
              />
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
