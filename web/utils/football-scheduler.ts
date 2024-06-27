import cron from "node-cron";
import fetchFootballFixtures from "@/scripts/fetch-football-fixtures";
import fetchFootballFixturesByLeague from "@/scripts/fetch-football-fixtures-by-league";

// Schedule the task to run every X minutes
// cron.schedule("*/1 * * * *", async () => {
//   console.log("Fetching fixtures...");
//   await fetchFootballFixtures();
// });

cron.schedule("*/1 * * * *", async () => {
  console.log("Fetching fixtures...");
  await fetchFootballFixturesByLeague(4);
});
