import { JSX } from "react";
import {
  CircleUser,
  LayoutDashboard,
  NotebookTabs,
  Lock,
  Boxes,
} from "lucide-react";
import { Role } from "./authorization";

export type Module =
  | "secret"
  | "profile"
  | "basicdetails"
  | "dashboard"
  | "services";

export type MenuConfig = Record<
  Module,
  { label: string; icon: JSX.Element; route: string; minRole: Role }
>;

export const menuConfig: MenuConfig = {
  dashboard: {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    route: "/",
    minRole: Role.USER,
  },
  profile: {
    label: "Profile",
    icon: <CircleUser />,
    route: "/profile",
    minRole: Role.USER,
  },
  basicdetails: {
    label: "Basic Details & Contact Information",
    icon: <NotebookTabs />,
    route: "basicdetails",
    minRole: Role.USER,
  },
  secret: {
    label: "Secret",
    icon: <Lock />,
    route: "secret",
    minRole: Role.SUPERADMIN,
  },
  services: {
    label: "Services",
    icon: <Boxes />,
    route: "services",
    minRole: Role.USER,
  },
};
