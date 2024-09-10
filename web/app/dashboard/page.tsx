import Profile from "@/components/dashboard/profile";
import ActiveBets from "@/components/dashboard/active-bets";

export default function BasketballPage() {
  return (
    <div>
      <Profile />
      <div className="mt-2">
        <ActiveBets />
      </div>
    </div>
  );
}
