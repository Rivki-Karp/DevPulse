import { apiGet, apiPost } from "../utils/apiWrapper";
import { getCurrentUserRole } from "../guards/getCurrentUser";
import { checkPermission, PermissionAction } from "../guards/Permissions";
import type { Priority } from "../models/ticket.model";

export const getPriorities = async (): Promise<Priority[]> => {
    const data = await apiGet<Priority[]>("/priorities", {
        errorTitle: "Error fetching priorities"
    });
    return data || [];
};

export const postPriorities = async (priority: Priority[]) => {
    const userRole = getCurrentUserRole();
    if (!userRole || !checkPermission(userRole, PermissionAction.CREATE_PRIORITIES)) return -1;
    
    const result = await apiPost("/priorities", priority, {
        errorTitle: "Error posting priorities"
    });
    return result?.status || -1;
};