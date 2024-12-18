import { redirect } from "next/navigation";
import { Module } from "./menu";
import { getSession } from "./session";

export enum Role {
  USER = 0,
  STAFF = 100,
  SUPERADMIN = 200,
}
export namespace Role {
  export function isAdmin(role: Role): boolean {
    return role === Role.SUPERADMIN;
  }
  export function getUserRoleName(role: Role) {
    switch (role) {
      case Role.USER:
        return "User";
      case Role.STAFF:
        return "Staff";
      case Role.SUPERADMIN:
        return "Super Admin";
      default:
        const _exhaustiveCheck: never = role;
        throw new Error("CRASH AND BURN");
    }
  }
  export function hasActionAccess(
    module: Module,
    action: Action,
    role: Role,
  ): boolean {
    const modulePermissions = MODULE_PERMISSION[module];
    return Role.isAdmin(role)
      ? true
      : modulePermissions[role]?.includes(action) || false;
  }
}

type Action = "read" | "create" | "edit" | "destroy";

const allActions: Action[] = ["read", "create", "destroy", "edit"];

type ModulePermissions = Partial<Record<Role, Action[]>>;
const default_permissions: ModulePermissions = {
  [Role.SUPERADMIN]: allActions,
  [Role.STAFF]: ["read", "create", "edit"],
  [Role.USER]: ["read"],
};

const MODULE_PERMISSION: Record<Module, ModulePermissions> = {
  services: {
    ...default_permissions,
  },
  secret: {
    [Role.SUPERADMIN]: allActions,
  },
  profile: {
    [Role.STAFF]: allActions,
    [Role.SUPERADMIN]: allActions,
    [Role.USER]: allActions,
  },
  basicdetails: {
    ...default_permissions,
  },
  dashboard: {
    ...default_permissions,
  },
};

export function ProtectedComponent({
  children,
  module,
  action,
  role,
  fallback,
}: {
  children: React.ReactNode;
  module: Module;
  action: Action;
  role: Role;
  fallback: boolean;
}) {
  if (Role.hasActionAccess(module, action, role)) {
    return { children };
  } else {
    if (fallback) {
      return <>You dont have enough permission</>;
    } else {
      return <></>;
    }
  }
}
