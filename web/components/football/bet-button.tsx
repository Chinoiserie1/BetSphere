"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { bigint, z } from "zod";
import { Loader2 } from "lucide-react";

import { ethers, parseEther } from "ethers";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useWriteWeb3Football } from "@/hooks/use-write-web3-football";
import { useReadWeb3FootballBet } from "@/hooks/use-read-web3-football";
import {
  winnerCondition,
  maxDirection,
  keysParams,
} from "@/lib/football-constant";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  amount: z.coerce.number().positive(),
});
type FormData = z.infer<typeof formSchema>;

type OddsButtonProps = {
  betId: bigint;
  teamsName: string;
  betDirection: number;
  fixtureId: number;
  fixtureTimestamp: number;
  isBetDisabled: boolean;
};

export default function BetButton({
  betId,
  teamsName,
  betDirection,
  fixtureId,
  fixtureTimestamp,
  isBetDisabled,
}: OddsButtonProps) {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { betFor } = useWriteWeb3Football(walletProvider);
  const { getUserBetById } = useReadWeb3FootballBet();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUserAsBet, setIsUserAsBet] = useState(false);
  const [userBetAmount, setUserBetAmount] = useState(ethers.toBigInt(0));
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async (values: FormData) => {
    if (!isConnected) open();
    setLoading(true);
    try {
      const tx = await betFor(
        betId,
        betDirection,
        parseEther(values.amount.toString())
      );
      const txResolve = await tx.wait();
      console.log("txResolve", txResolve);
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleClick = async () => {
    isConnected ? setDialogOpen(true) : open();
  };

  useEffect(() => {
    const init = async () => {
      if (!isConnected) return;
      if (!address) return;
      const userBet = await getUserBetById(betId, address);
      const amount = userBet[1] as bigint;
      const direction = Number(userBet[2]);
      amount > 0 && direction != betDirection
        ? setIsUserAsBet(true)
        : setIsUserAsBet(false);
      if (betDirection == direction) {
        setUserBetAmount(amount);
      }
    };
    init();
  }, [address, isConnected, betId, onSubmit]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div>
          <Button
            disabled={isBetDisabled || isUserAsBet}
            variant="yellow"
            size="lg"
            className={cn("h-15 w-full")}
            onClick={handleClick}
          >
            <div className="flex flex-col">
              <div className="text-xs text-center w-full font-medium pt-2">
                {teamsName}
              </div>
              {isBetDisabled ? (
                <div className="font-bold text-xl pb-2">Create bet first</div>
              ) : (
                <div className="font-bold text-xl pb-2">1</div>
              )}
            </div>
          </Button>
          {userBetAmount > 0 ? (
            <div className="text-xs text-center w-full font-medium pt-2">
              Your bet: {ethers.formatEther(userBetAmount?.toString())} ETH
            </div>
          ) : null}
        </div>
      </DialogTrigger>
      <DialogContent className={cn("p-8 sm:max-w-[425px]")}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{`Bet on ${teamsName}`}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-4 text-sm mb-1">
                    Amount to bet
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      min="0"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Balance:</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="yellow">
              {loading ? (
                <div className="flex flex-row">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                `Bet on ${teamsName}`
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
