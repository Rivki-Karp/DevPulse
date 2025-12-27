import showWarningAlert from "../components/styleComponnents/myAlert";
import { UserRole } from "../models/user.model";

export const PermissionAction = {
    READ_USERS: "READ_USERS",
    CREATE_USERS: "CREATE_USERS",

    READ_TICKET: "READ_TICKET",
    CREATE_TICKET: "CREATE_TICKET",
    UPDATE_TICKET: "UPDATE_TICKET",
    DELETE_TICKET: "DELETE_TICKET",

    READ_STATUSES: "READ_STATUSES",
    CREATE_STATUSES: "CREATE_STATUSES",

    READ_PRIORITIES: "READ_PRIORITIES",
    CREATE_PRIORITIES: "CREATE_PRIORITIES",

    ADD_COMMENT: "ADD_COMMENT",
    READ_COMMENTS: "READ_COMMENTS",

} as const;

export type PermissionAction = typeof PermissionAction[keyof typeof PermissionAction];

const ROLE_PERMISSIONS: Record<UserRole, PermissionAction[]> = {
    [UserRole.TEAM_LEAD]: [
        PermissionAction.READ_USERS,
        PermissionAction.CREATE_USERS,
        PermissionAction.READ_TICKET,
        PermissionAction.CREATE_TICKET,
        PermissionAction.UPDATE_TICKET,
        PermissionAction.DELETE_TICKET,
        PermissionAction.READ_STATUSES,
        PermissionAction.CREATE_STATUSES,
        PermissionAction.READ_PRIORITIES,
        PermissionAction.CREATE_PRIORITIES,
        PermissionAction.ADD_COMMENT,
        PermissionAction.READ_COMMENTS,

    ],

    [UserRole.DEVELOPER]: [
        PermissionAction.READ_TICKET,
        PermissionAction.UPDATE_TICKET,
        PermissionAction.ADD_COMMENT,
        PermissionAction.READ_COMMENTS,

    ],

    [UserRole.CLIENT_PM]: [
        PermissionAction.READ_TICKET,
        PermissionAction.CREATE_TICKET,
        PermissionAction.ADD_COMMENT,
        PermissionAction.READ_COMMENTS,

    ],
};

export const checkPermission = (userRole: UserRole, action: PermissionAction): boolean => {
    const hasPermission = ROLE_PERMISSIONS[userRole]?.includes(action);

    if (!hasPermission) {
        showWarningAlert(
            "Access Denied",
            "You do not have permission to perform this action."
        );
        return false;
    }

    return true;
};
