import { NextRequest, NextResponse } from "next/server";
import { addFixtureLeague } from "@/utils/football/add-fixture-league";

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Run the cron job here
  const leagueNumbers = [1, 2, 3, 4, 6, 9, 39, 61, 71];

  try {
    await Promise.all(
      leagueNumbers.map((leagueNumber) => addFixtureLeague(leagueNumber))
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch fixtures from API", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
