import axiosInstance from "./axiosInstance";
import type { Ticket } from "../models/ticket.model";
import showWarningAlert from "../components/styleComponnents/myAlert";
import { checkPermission, PermissionAction } from "../guards/Permissions";
import { getCurrentUserRole } from "../guards/getCurrentUser";

export const getAllTickets = async (): Promise<Ticket[]> => {
    try {
        const response = await axiosInstance.get("/tickets");
        return response.data as Ticket[];
    } catch (error) {
        console.error("Error fetching tickets:", error);
        showWarningAlert(
            "Error fetching tickets",
            "Please try again later or contact support."
        );
        return [];
    }
};

export const getTicketByID = async (id: number): Promise<Ticket | null> => {
    try {
        const response = await axiosInstance.get(`/tickets/${id}`);
        return response.data as Ticket;
    } catch (error: any) {
        const status = error.response?.status;
        if (status === 404) {
            showWarningAlert("Ticket not found (error 404)", "Please check the ticket ID or contact support.");
        } else {
            showWarningAlert(`Error fetching ticket id: ${id}`, "Please try again later or contact support.");
        }
        console.error(`Error fetching ticket id: ${id}`, error);
        return null;
    }
};

export const patchTicketByID = async (id: number,ticket: { subject?: string; description?: string;status_id?: number;priority_id?: number;assigned_to?: number;}
): Promise<number> => {

    const role = getCurrentUserRole();
    if (!role || !checkPermission(role, PermissionAction.UPDATE_TICKET)) return -1;

    try {
        const response = await axiosInstance.patch(`/tickets/${id}`, ticket);
        return response.status;
    } catch (error: any) {
        const status = error.response?.status;
        if (status === 404) {
            showWarningAlert("Ticket not found (error 404)", "Please check the ticket ID or contact support.");
        } else {
            showWarningAlert(`Error patching ticket id: ${id}`, "Please try again later or contact support.");
        }
        console.error(`Error patching ticket id: ${id}`, error);
        return -1;
    }
};


export const deleteTicketByID = async (id: number): Promise<number> => {
    const role = getCurrentUserRole();
    if (!role || !checkPermission(role, PermissionAction.DELETE_TICKET)) return -1;

    try {
        const response = await axiosInstance.delete(`/tickets/${id}`);
        return response.status;
    } catch (error: any) {
        const status = error.response?.status;
        if (status === 404) {
            showWarningAlert("Ticket not found (error 404)", "Please check the ticket ID or contact support.");
        } else {
            showWarningAlert(`Error deleting ticket id: ${id}`, "Please try again later or contact support.");
        }
        console.error(`Error deleting ticket id: ${id}`, error);
        return -1;
    }
};

export const postTicket = async (ticket: { subject: string; description: string; status_id: number; priority_id: number; assigned_to: number; }) => {
    const userRole = getCurrentUserRole();
    if (!userRole || !checkPermission(userRole, PermissionAction.CREATE_TICKET)) return -1;

    try {
        const response = await axiosInstance.post("/tickets", ticket);
        return response.status;
    } catch (error) {
        console.error("Error posting ticket:", error);
        showWarningAlert(
            "Error posting ticket",
            "Please try again later or contact support."
        );
        return -1;
    }
};
