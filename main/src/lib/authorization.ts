
export enum Role {
    STAFF = 0,
    SUPERADMIN = 1,
}
export namespace Role{
   export function isAdmin(role:Role): boolean{
        return role === Role.SUPERADMIN
    }
}

type Action = "read" | "create" | "update" | "destroy" | "all";

type Module = "services" | "porfolio";

type ModulePermissions = Partial<Record<Role,Action[]>>;

const MODULE_PERMISSION: Record<Module,ModulePermissions> = {
    services:{
        [Role.SUPERADMIN]:['all'],
        [Role.STAFF]:['read','create','update']
    },
    porfolio:{

    }
}

function hasAccess(module:Module, action: Action, role: Role): boolean{
    const modulePermissions = MODULE_PERMISSION[module];

    return Role.isAdmin(role) ? true: modulePermissions[role]?.includes(action) || false
}


export {hasAccess};
