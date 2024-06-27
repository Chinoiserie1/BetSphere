import { cn } from "@/lib/utils";
import ConnectButton from "./connect-button";
import ThemeModeToggle from "../theme-mode-toggle";
import { Card } from "../ui/card";

const Header = () => {
  return (
    <Card
      className={cn(
        "z-20 h-16 flex items-center p-3 px-8 border-0 border-b rounded-none"
      )}
    >
      <div className="text-2xl">BetSphere</div>
      <div className="ml-auto">
        <ConnectButton />
      </div>
      <div className="ml-4">
        <ThemeModeToggle />
      </div>
    </Card>
  );
};

export default Header;
