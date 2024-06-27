"use client";

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useWeb3Modal } from "@web3modal/ethers/react";

export function LoginNav() {
  const { open } = useWeb3Modal();

  const handleClick = () => {
    console.log("open");
    open();
  };

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-8 h-8 bg-background"
            variant="outline"
            size="icon"
            onClick={handleClick}
          >
            <LogIn className="w-[1rem] h-[1rem]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Log In</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
