import axiosInstance from "./axiosInstance";
import showWarningAlert from "../components/styleComponnents/myAlert";
import { getCurrentUserRole } from "../guards/getCurrentUser";
import { checkPermission, PermissionAction } from "../guards/Permissions";
import type { Priority } from "../models/ticket.model";


export const getPriorities = async (): Promise<Priority[]> => {
    try {
        const response = await axiosInstance.get("/priorities");
        return response.data as Priority[];
    } catch (error) {
        console.error("Error fetching priorities:", error);
        showWarningAlert(
            "Error fetching priorities",
            "Please try again later or contact support."
        );
        return [];
    }
};

export const postPriorities = async (priority: Priority[]) => {
    const userRole = getCurrentUserRole();
    if (!userRole || !checkPermission(userRole, PermissionAction.CREATE_PRIORITIES)) return -1;
    try {
        const response = await axiosInstance.post("/priorities", priority);
        return response.status;
    } catch (error) {
        console.error("Error posting priorities:", error);
        showWarningAlert(
            "Error posting priorities",
            "Please try again later or contact support."
        );
        return -1;
    }
};