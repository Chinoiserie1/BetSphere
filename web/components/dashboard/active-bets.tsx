"use client";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";

import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useReadWeb3FootballBet } from "@/hooks/use-read-web3-football";

import ActiveBetCard from "./active-bet-card";

export default function ActiveBets() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { getActiveBetsByUser } = useReadWeb3FootballBet();
  const [activeBets, setActiveBets] = useState<[]>();

  useEffect(() => {
    const init = async () => {
      if (!isConnected || !address) return;
      const activeBetsByUser = await getActiveBetsByUser(address);
      setActiveBets(activeBetsByUser);
    };
    init();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <Card className="p-3">
        <h1 className="font-bold">Active Bets</h1>
        <p className="pt-3 pb-3">
          Please connect your wallet to view active bets
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-3">
      <h1 className="font-bold">Active Bets</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3">
        {activeBets?.map((betId: string) => {
          return <ActiveBetCard betId={betId} key={betId} />;
        })}
      </div>
    </Card>
  );
}
