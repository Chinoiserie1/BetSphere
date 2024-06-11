"use client";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import formatAddress from "../utils/formatAddress";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const displayAddress =
    isConnected && address ? formatAddress(address) : "Connect";

  return (
    <button
      className="ml-2 px-4 py-1 bg-white text-red-600 rounded-lg hover:bg-white/60"
      onClick={() => open()}
    >
      {isConnected ? displayAddress : "Connect"}
    </button>
  );
};

export default ConnectButton;
