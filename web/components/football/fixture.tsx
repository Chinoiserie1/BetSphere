"use client";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers, BrowserProvider, Contract } from "ethers";
import { FootballFixture } from "@/prisma/football-types";

import ABI from "@/abi/BetSphere.json";
import { useState, useEffect } from "react";

const winnerCondition =
  "if(key1 > key2){return 1};if(key1 == key2){return 2};return 3;";

const maxDirection = 3;

const keysParams = ["response[0].goals.home", "response[0].goals.away"];

const params = [""];

export function useWeb3FootballBet(
  walletProvider: ethers.Eip1193Provider | undefined
) {
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [provider, setProvider] = useState<ethers.BrowserProvider>();

  useEffect(() => {
    const init = async () => {
      if (!walletProvider) {
        return;
      }
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const contract = new Contract(
        process.env.NEXT_PUBLIC_BETSPHERE_CONTRACT_ADDRESS as string,
        ABI.abi,
        signer
      );
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
    };
    init();
  }, [walletProvider]);

  if (!walletProvider || !contract) {
    return {
      contract: undefined,
      provider: undefined,
      getFootballFixtureURL: undefined,
      getComputedBetId: undefined,
      createBet: undefined,
    };
  }

  // const provider = new BrowserProvider(walletProvider);
  // // const signer = provider.getSigner();
  // const contract = new Contract(
  //   "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  //   ABI.abi,
  //   provider
  // );

  const getBetInfo = async (betId: number) => {
    const betInfo = await contract.betInfo(betId);
    return betInfo;
  };

  const getFootballFixtureURL = (fixtureId: number) => {
    return `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixtureId}`;
  };

  const getComputedBetId = async (
    condition: string,
    url: string,
    maxDirection: number
  ) => {
    const id = await contract.getBetId(condition, url, maxDirection);
    return id;
  };

  const createBet = async (
    maxDirection: number,
    timestamp: number,
    url: string,
    condition: string,
    params: string[],
    keys: string[]
  ) => {
    const id = await contract.createBet(
      maxDirection,
      timestamp,
      url,
      condition,
      params,
      keys
    );
    return id;
  };

  return {
    contract,
    provider,
    getBetInfo,
    getFootballFixtureURL,
    getComputedBetId,
    createBet,
  };
}

export default function Fixture({ fixture }: { fixture: FootballFixture }) {
  const { walletProvider } = useWeb3ModalProvider();
  const {
    getBetInfo,
    getFootballFixtureURL,
    getComputedBetId,
    createBet,
    provider,
    contract,
  } = useWeb3FootballBet(walletProvider);

  if (!walletProvider || !provider) {
    return <div></div>;
  }

  const handleClick = async () => {
    const url = getFootballFixtureURL(fixture.id);
    const computedBetId = await getComputedBetId(
      winnerCondition,
      url,
      maxDirection
    );
    const betInfo = await getBetInfo(computedBetId);
    console.log("betInfo", betInfo);
    if (ethers.toNumber(betInfo[0]) == 0) {
      const timestamp = fixture.timestamp + 3600 * 3;
      const id = await createBet(
        maxDirection,
        timestamp,
        url,
        winnerCondition,
        params,
        keysParams
      );
      console.log("id", id);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
