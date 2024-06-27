"use client";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import formatAddress from "../../utils/formatAddress";
import { Button } from "../ui/button";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const displayAddress =
    isConnected && address ? formatAddress(address) : "Connect";

  return (
    <Button onClick={() => open()}>
      {isConnected ? displayAddress : "Connect"}
    </Button>
  );
};

export default ConnectButton;
