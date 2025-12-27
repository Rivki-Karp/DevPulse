import axiosInstance from "./axiosInstance";
import showWarningAlert from "../components/styleComponnents/myAlert";
import { getCurrentUserRole } from "../guards/getCurrentUser";
import { checkPermission, PermissionAction } from "../guards/Permissions";
import type { Status } from "../models/ticket.model";

export const getStatuses = async (): Promise<Status[]> => {
    try {
        const response = await axiosInstance.get("/statuses");
        return response.data as Status[];
    } catch (error) {
        console.error("Error fetching statuses:", error);
        showWarningAlert(
            "Error fetching statuses",
            "Please try again later or contact support."
        );
        return [];
    }
};

export const postStatuses = async (status: Status[]) => {
    const userRole = getCurrentUserRole();
    if (!userRole || !checkPermission(userRole, PermissionAction.CREATE_STATUSES)) return -1;
    try {
        const response = await axiosInstance.post("/statuses", status);

        return response.status;
    } catch (error) {
        console.error("Error posting statuses:", error);
        showWarningAlert(
            "Error posting statuses",
            "Please try again later or contact support."
        );
        return -1;
    }
};
