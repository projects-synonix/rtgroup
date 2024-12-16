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
  { label: string; icon: JSX.Element; route: string; minRole: Role, folderPath: string }
>;

export const menuConfig: MenuConfig = {
  dashboard: {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    route: "/",
    minRole: Role.USER,
    folderPath: '/uploads/dashboard'
  },
  profile: {
    label: "Profile",
    icon: <CircleUser />,
    route: "/profile",
    minRole: Role.USER,
    folderPath: '/uploads/profile'
  },
  basicdetails: {
    label: "Basic Details & Contact Information",
    icon: <NotebookTabs />,
    route: "basicdetails",
    minRole: Role.USER,
    folderPath: '/uploads/basicdetails'
  },
  secret: {
    label: "Secret",
    icon: <Lock />,
    route: "secret",
    minRole: Role.SUPERADMIN,
    folderPath: '/uploads/secret'
  },
  services: {
    label: "Services",
    icon: <Boxes />,
    route: "services",
    minRole: Role.USER,
    folderPath: '/uploads/services'
  },
};
