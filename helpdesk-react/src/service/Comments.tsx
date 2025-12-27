import axiosInstance from "./axiosInstance";
import type { Comment } from "../models/comments.model";
import showWarningAlert from "../components/styleComponnents/myAlert";
import { checkPermission, PermissionAction } from "../guards/Permissions";
import { getCurrentUserRole } from "../guards/getCurrentUser";

export const getCommentsByTicketID = async (id: number): Promise<Comment[]> => {
    try {
        const response = await axiosInstance.get(`/tickets/${id}/comments`);
        return response.data as Comment[];
    } catch (error) {
        console.error(`Error fetching comments for ticket id: ${id}`, error);
        showWarningAlert(
            `Error fetching comments for ticket id: ${id}`,
            "Please try again later or contact support."
        );
        return [];
    }
};

export const postCommentsByTicketID = async (id: number, comment: Comment): Promise<number> => {
    const userRole = getCurrentUserRole();
    if (!userRole || !checkPermission(userRole, PermissionAction.ADD_COMMENT)) return -1;
    try {
        const response = await axiosInstance.post(`/tickets/${id}/comments`, comment);
        return response.status;
    } catch (error) {
        console.error(`Error posting comment for ticket id: ${id}`, error);
        showWarningAlert(
            `Error posting comment for ticket id: ${id}`,
            "Please try again later or contact support."
        );
        return -1;
    }
};
