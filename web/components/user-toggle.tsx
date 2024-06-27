"use client";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { UserNav } from "./admin-panel/user-nav";
import { LoginNav } from "./admin-panel/login-nav";

export function UserToggle() {
  const { isConnected } = useWeb3ModalAccount();

  return isConnected ? <UserNav /> : <LoginNav />;
}
