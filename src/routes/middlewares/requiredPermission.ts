import { Request, Response, NextFunction } from 'express';

interface IRole {
    id: string,
    name: string,
    description: string,
    resources: { id: string, permissions: string[] }[]
}

interface IRoleMap {
    [role: string]: IRole
}

const roles: IRoleMap = {
    manager: {
        id: 'manager',
        name: 'Manager',
        description: '',
        resources: [
            {
                id: 'user',
                permissions: ['create', 'read', 'update', 'delete']
            },
            {
                id: 'product',
                permissions: ['create', 'read', 'update', 'delete']
            },
            {
                id: 'request',
                permissions: ['create', 'read']
            }
        ]
    },
    cashier: {
        id: 'cashier',
        name: 'Cashier',
        description: '',
        resources: [
            {
                id: 'order',
                permissions: ['create']
            }
        ]
    },
    stockClerk: {
        id: 'stockclerk',
        name: 'Stock Clerk',
        description: '',
        resources: [
            {
                id: 'product',
                permissions: ['read', 'update']
            },
            {
                id: 'request',
                permissions: ['update']
            }
        ]
    }
}

function checkRoleHasPermission(args: { requiredResource: string, requiredPermission: string, role: string }): boolean {
    const { requiredResource, requiredPermission, role } = args;

    // Use "hasOwnProperty" in TypeScript.
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    if (!hasOwnProperty.call(roles, role)) {
        return false;
    }

    const resources = (roles[role] as IRole).resources
    const resource = resources.find(resource => resource.id === requiredResource)
    if (!resource) {
        return false;
    }
    if (resource.permissions.indexOf(requiredPermission) === -1) {
        return false;
    }

    return true;
}

function requiredPermission(args: { requiredResource: string, requiredPermission: string }) {
    return function (req: Request, res: Response, next: NextFunction) {
        const user = req['user'];
        const userRoles = user.roles as string[];

        const { requiredResource, requiredPermission} = args;
        for (const role of userRoles) {
            if (checkRoleHasPermission({ requiredResource: requiredResource, requiredPermission: requiredPermission, role: role })) {
                return next();
            }
        }

        res.status(403).json({
            message: 'Not allowed.'
        })
    }
}

export default requiredPermission;
