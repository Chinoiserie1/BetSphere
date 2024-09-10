import { Card, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BetInfo } from "@prisma/client";

import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useReadContract } from "@/hooks/use-read-contract";
import Link from "next/link";

import { getActiveBets } from "@/app/actions/get-active-bets";

type ActiveBetCardProps = {
  betId: string;
};

export default function ActiveBetCard({ betId }: ActiveBetCardProps) {
  const [betInfo, setBetInfo] = useState<BetInfo | null>(null);
  const [contractBetInfo, setContractBetInfo] = useState<bigint[]>([]);
  const { address } = useWeb3ModalAccount();
  const { getUserBetById } = useReadContract();

  useEffect(() => {
    async function fetchBetInfo() {
      // const response = await fetch(`/api/get-active-bet?id=${betId}`);
      // const data = await response.json();
      const activeBets = await getActiveBets(betId);
      console.log("activeBets", activeBets);
      setBetInfo(activeBets?.bets as BetInfo);
    }

    async function getBetInfo() {
      if (!address) return;
      const contractInfo = await getUserBetById(BigInt(betId), address);
      console.log("contractInfo", contractInfo);
      setContractBetInfo(contractInfo);
    }

    fetchBetInfo();
    getBetInfo();
  }, [betId]);

  if (!betInfo) {
    return <Card className="p-6 mt-4">Loading...</Card>;
  }

  const direction = contractBetInfo
    ? betInfo.directions[Number(contractBetInfo[2]) - 1]
    : "loading...";

  console.log("betInfo", betInfo);
  console.log(Number(contractBetInfo[2]));
  console.log("direction", direction);

  return (
    <div>
      <Link href={`/bet/${betId}`}>
        <Card className="p-6 mt-4 hover:border-2">
          <CardHeader className="p-0">
            <div className="flex flex-row">
              <span className="flex text-md items-center font-medium leading-none">
                {betInfo.description}
              </span>
            </div>
          </CardHeader>
          <div className="flex flex-col mt-4">
            <span className="flex text-sm items-center font-medium leading-none">
              Your bet: {direction}
            </span>
            <span className="flex text-sm items-center font-medium leading-none pt-1">
              Amount:{" "}
              {contractBetInfo
                ? ethers.formatEther(contractBetInfo[1]?.toString())
                : "loading..."}{" "}
              ETH
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
}
