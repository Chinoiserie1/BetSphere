import prisma from "@/lib/db";

import { Card, CardHeader } from "@/components/ui/card";

type BetIdPageProps = {
  params: {
    betId: string;
  };
};

export default async function BetIdPage({ params }: BetIdPageProps) {
  const bet = await prisma.betInfo.findUnique({
    where: { id: params.betId },
  });

  if (!bet) {
    return <div>Bet not found</div>;
  }

  console.log("bet", bet);

  return (
    <div>
      <Card className="p-6 mt-4 space-y-3">
        <CardHeader className="p-0">
          <h1 className="text-xl font-bold">Bet description</h1>
        </CardHeader>
        <div className="mt-2">
          <h1>Name: {bet.name}</h1>
          <p>Description: {bet.description}</p>
          <p>Verification api URL: {bet.url}</p>
        </div>
      </Card>
    </div>
  );
}
