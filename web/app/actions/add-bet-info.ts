"use server";
import prisma from "@/lib/db";

export async function addBetInfo(
  betId: string,
  name: string,
  description: string,
  url: string,
  maxDirections: number,
  directions: string[]
) {
  try {
    const betInfo = await prisma.betInfo.upsert({
      where: { id: betId },
      update: {
        name,
        description,
        url,
        maxDirections,
        directions,
        status: "Started",
      },
      create: {
        id: betId,
        name,
        description,
        url,
        maxDirections,
        directions,
        status: "Started",
      },
    });
    return betInfo;
  } catch (error) {
    console.error(error);
  }
}
