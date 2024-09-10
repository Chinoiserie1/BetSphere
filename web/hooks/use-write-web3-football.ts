import { useEffect, useState } from "react";
import { ethers, BrowserProvider, Contract } from "ethers";
import ABI from "@/abi/BetSphere.json";
import { set } from "zod";

export function useWriteWeb3Football(
  walletProvider: ethers.Eip1193Provider | undefined
) {
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (!walletProvider) {
        return;
      }
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const nonce = await provider.getTransactionCount(signer.getAddress());
      console.log("nonce", nonce);
      const contract = new Contract(
        process.env.NEXT_PUBLIC_BETSPHERE_CONTRACT_ADDRESS as string,
        ABI.abi,
        signer
      );
      setSigner(signer);
      setProvider(provider);
      setContract(contract);
    };
    init();
  }, [walletProvider]);

  const getBetInfo = async (betId: bigint) => {
    const betInfo = await contract?.betInfo(betId);
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
    if (!contract) {
      setIsError(true);
      setError("Contract not found");
      return;
    }
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
    if (!contract) {
      setIsError(true);
      setError("Contract not found");
      return;
    }
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

  const betFor = async (
    betId: bigint,
    direction: number,
    valueInWei: bigint
  ) => {
    if (!contract) {
      setIsError(true);
      setError("Contract not found");
      return;
    }
    try {
      const tx = await contract.betFor(betId, direction, { value: valueInWei });
      return tx;
    } catch (error) {
      setIsError(true);
      setError(error as string);
      console.error(error);
    }
  };

  return {
    contract,
    provider,
    signer,
    error,
    isError,
    getBetInfo,
    getFootballFixtureURL,
    getComputedBetId,
    createBet,
    betFor,
  };
}
