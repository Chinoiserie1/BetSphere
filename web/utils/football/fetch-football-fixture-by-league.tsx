// fetch football fixtures by league number
import "server-only";
import { FootballGames } from "@/prisma/football-types";

export default async function fetchFootballFixtureByLeague(
  leagueNumber: number
) {
  const response = await fetch(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures?next=50&league=${leagueNumber}`,
    {
      headers: {
        "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      } as Record<string, string>,
      next: { revalidate: 21600 },
    }
  ).then((res) => res.json());
  return FootballGames.parse(response.response);
}
