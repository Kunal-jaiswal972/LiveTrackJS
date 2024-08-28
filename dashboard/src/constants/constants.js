import { Settings, ChartPie, LayoutGrid, KeyRound, Gem } from "lucide-react";

export const floatingShapesConfig = [
  {
    color: "bg-green-500",
    size: "w-64 h-64",
    top: "-5%",
    left: "10%",
    delay: 0,
  },
  {
    color: "bg-emerald-500",
    size: "w-48 h-48",
    top: "70%",
    left: "80%",
    delay: 5,
  },
  {
    color: "bg-lime-500",
    size: "w-32 h-32",
    top: "40%",
    left: "-10%",
    delay: 2,
  },
];

export function getMenuList(pathname) {
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
      groupLabel: "Contents",
      menus: [
        // {
        //   href: "",
        //   label: "Posts",
        //   active: pathname.includes("/posts"),
        //   icon: SquarePen,
        //   submenus: [
        //     {
        //       href: "/posts",
        //       label: "All Posts",
        //       active: pathname === "/posts",
        //     },
        //     {
        //       href: "/posts/new",
        //       label: "New Post",
        //       active: pathname === "/posts/new",
        //     },
        //   ],
        // },
        {
          href: "/dashboard/analytics",
          label: "Analytics",
          active: pathname.includes("/dashboard/analytics"),
          icon: ChartPie,
          submenus: [],
        },
        {
          href: "/dashboard/keys",
          label: "API Keys",
          active: pathname.includes("/dashboard/keys"),
          icon: KeyRound,
          submenus: [],
        },
        {
          href: "/dashboard/billings",
          label: "Billings",
          active: pathname.includes("/dashboard/billings"),
          icon: Gem,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/account",
          label: "Account",
          active: pathname.includes("/dashboard/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
