import { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import switchProvider from "@/utils/web3/switch-provider";

import ABI from "@/abi/BetSphere.json";

export function useReadContract() {
  const { chainId } = useWeb3ModalAccount();
  const defaultProvider = switchProvider(chainId);
  const [provider, setProvider] = useState<ethers.AbstractProvider>(
    ethers.getDefaultProvider(defaultProvider)
  );
  const [readContract, setReadContract] = useState<Contract>(
    new Contract(
      process.env.NEXT_PUBLIC_BETSPHERE_CONTRACT_ADDRESS as string,
      ABI.abi,
      provider
    )
  );

  useEffect(() => {
    if (chainId) {
      const defaultProvider = switchProvider(chainId);
      const provider = ethers.getDefaultProvider(defaultProvider);
      const contract = new Contract(
        process.env.NEXT_PUBLIC_BETSPHERE_CONTRACT_ADDRESS as string,
        ABI.abi,
        provider
      );
      setProvider(provider);
      setReadContract(contract);
    }
  }, [chainId]);

  const getBetInfo = async (betId: bigint) => {
    const betInfo = await readContract.betInfo(betId);
    return betInfo;
  };

  const getOdds = async (betId: bigint) => {
    const odds = await readContract.getOdds(betId);
    return odds;
  };

  const getUserBetById = async (betId: bigint, address: `0x${string}`) => {
    const bet = await readContract.userBetById(betId, address);
    return bet;
  };

  const getActiveBetsByUser = async (address: `0x${string}`) => {
    const bets = await readContract.getActiveBetsByUser(address);
    return bets;
  };

  return { getBetInfo, getOdds, getUserBetById, getActiveBetsByUser };
}
