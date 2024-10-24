"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { CircleHelp } from "lucide-react";
import { Loader2 } from "lucide-react";

import { ethers } from "ethers";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useWriteWeb3Football } from "@/hooks/use-write-web3-football";

import { addBetInfo } from "@/app/actions/add-bet-info";

import {
  winnerCondition,
  maxDirection,
  keysParams,
} from "@/lib/football-constant";
import { useState } from "react";

type CreateBetButtonProps = {
  betId: bigint;
  fixtureId: number;
  fixtureTimestamp: number;
  teamsName: { home: string; away: string };
  setBetCreated: (value: boolean) => void;
};

export default function CreateBetButton({
  betId,
  fixtureId,
  fixtureTimestamp,
  teamsName: { home, away },
  setBetCreated,
}: CreateBetButtonProps) {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { signer, getBetInfo, getFootballFixtureURL, createBet } =
    useWriteWeb3Football(walletProvider);
  const [loading, setLoading] = useState(false);

  const directions = [home, "Draw", away];

  const handleCreateBet = async () => {
    if (!isConnected) {
      open();
    }
    setLoading(true);
    const betInfo = await getBetInfo(betId);
    console.log("betInfo", betInfo);
    if (ethers.toNumber(betInfo[0]) == 0) {
      try {
        const Verificationtimestamp = fixtureTimestamp + 3600 * 3; // 3 hours after the match
        const url = getFootballFixtureURL(fixtureId);
        const id = await createBet(
          maxDirection,
          fixtureTimestamp,
          Verificationtimestamp,
          url,
          winnerCondition,
          [],
          keysParams
        );
        const txResolve = await id.wait();
        if (txResolve.status == 1) {
          const betInfo = await addBetInfo(
            betId.toString(),
            "Football winner",
            `${home} vs ${away}`,
            url,
            maxDirection,
            directions
          );
          setBetCreated(true);
        }
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-row items-center">
      <Button
        variant="link"
        size="sm"
        onClick={handleCreateBet}
        className={cn("h-7 px-1")}
      >
        {loading ? (
          <div className="flex flex-row">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait</span>
          </div>
        ) : (
          "Create Bet"
        )}
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm_icon"
            className="rounded-full bg-background"
          >
            <CircleHelp className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </DialogTrigger>
        <DialogContent className={cn("p-8 sm:max-w-[425px]")}>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Advantage for bet creator
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="text-sm text-center font-medium">
              Creating a bet offers a unique incentive: the creator of the bet
              earns a 2% commission on all wagers placed. This means that by
              initiating a bet, you not only engage others in an exciting
              activity but also benefit financially from every participant. This
              commission provides a compelling reason to create and promote your
              own bets, turning your ideas into potential profit opportunities.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
