import {
  Users,
  Settings,
  Activity,
  CandlestickChart,
  LayoutGrid,
  DollarSign,
  Wrench,
} from "lucide-react";

// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";<CandlestickChart />
// import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Games",
      menus: [
        {
          href: "",
          label: "Sports",
          active:
            pathname.includes("/football") || pathname.includes("/basketball"),
          icon: Activity,
          submenus: [
            {
              href: "/football",
              label: "Football",
              active: pathname === "/football",
            },
            {
              href: "/basketball",
              label: "Basketball",
              active: pathname === "/basketball",
            },
          ],
        },
        {
          href: "/finance",
          label: "Finance",
          active: pathname.includes("/finance"),
          icon: CandlestickChart,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Raffles",
      menus: [
        {
          href: "raffles",
          label: "Raffles List",
          active: pathname.includes("/raffles"),
          icon: DollarSign,
          submenus: [],
        },
        {
          href: "/create-raffle",
          label: "Make my own Raffle",
          active: pathname.includes("/create-raffle"),
          icon: Wrench,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Users Bets",
      menus: [
        {
          href: "/custom-bets",
          label: "Bets",
          active: pathname.includes("/custom-bets"),
          icon: DollarSign,
          submenus: [],
        },
        {
          href: "/create-bet",
          label: "Create Bet",
          active: pathname.includes("/create-bet"),
          icon: Wrench,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
