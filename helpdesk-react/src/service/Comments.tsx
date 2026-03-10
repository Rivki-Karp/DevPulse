import { apiGet, apiPost } from "../utils/apiWrapper";
import type { Comment } from "../models/comments.model";
import { checkPermission, PermissionAction } from "../guards/Permissions";
import { getCurrentUserRole } from "../guards/getCurrentUser";

export const getCommentsByTicketID = async (id: number): Promise<Comment[]> => {
    const data = await apiGet<Comment[]>(`/tickets/${id}/comments`, {
        errorTitle: `Error fetching comments for ticket ${id}`
    });
    return data || [];
};

export const postCommentsByTicketID = async (id: number, comment: Comment): Promise<number> => {
    const userRole = getCurrentUserRole();
    if (!userRole || !checkPermission(userRole, PermissionAction.ADD_COMMENT)) return -1;
    
    const result = await apiPost(`/tickets/${id}/comments`, comment, {
        errorTitle: `Error posting comment for ticket ${id}`
    });
    return result?.status || -1;
};
