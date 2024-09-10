"use server";
import prisma from "@/lib/db";

export async function getActiveBets(id: string) {
  console.log("enter");
  console.log("id", id);

  try {
    const betInfo = await prisma.betInfo.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!betInfo) {
      return { message: "BetInfo not found" };
    }

    return { bets: betInfo };
  } catch (error) {
    console.error(error);
    return { message: "Internal server error", error };
  }
}
