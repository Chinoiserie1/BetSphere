import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  Dribbble,
  Activity,
  CandlestickChart,
  LayoutGrid,
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
      groupLabel: "Categories",
      menus: [
        {
          href: "",
          label: "Sports",
          active: pathname.includes("/"),
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
