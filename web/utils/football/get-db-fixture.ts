import "server-only";
import { unstable_cache } from "next/cache";

import prisma from "@/lib/db";

export async function getDbFixture(id: number) {
  return await prisma.footballFixture.findUnique({
    where: { id },
    include: {
      league: true,
      homeTeam: true,
      awayTeam: true,
      score: true,
    },
  });
}

export const getDbFixtureCached = async (id: number) => {
  const fixture = unstable_cache(
    async () => getDbFixture(id),
    [`fixture-${id}`],
    {
      tags: [`fixture-${id}`],
    }
  );

  return fixture();
};
