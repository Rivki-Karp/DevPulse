import axiosInstance from "./axiosInstance";
import { type User, UserRole } from "../models/user.model";
import showWarningAlert from "../components/styleComponnents/myAlert";
import { checkPermission, PermissionAction } from "../guards/Permissions";
import { getCurrentUserRole } from "../guards/getCurrentUser";


export const getAllUsers = async (): Promise<User[]> => {
    const role = getCurrentUserRole();
    if (!role || !checkPermission(role, PermissionAction.READ_USERS)) return [];
    try {
        const response = await axiosInstance.get("/users");
        return response.data as User[];
    } catch (error) {
        console.error("Error fetching users:", error);
        showWarningAlert("Error fetching users", "Please try again later or contact support.");
        return [];
    }
};

export const getUsersById = async (id: number): Promise<User | null> => {

    const role = getCurrentUserRole();
    if (!role || !checkPermission(role, PermissionAction.READ_USERS)) return null;
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data as User;
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        showWarningAlert(`Error fetching user ${id}`, "Please try again later or contact support.");
        return null;
    }
};

export const postUser = async (user: User): Promise<number> => {
    const role = getCurrentUserRole();
    if (!role || !checkPermission(role, PermissionAction.CREATE_USERS)) return -1;

    try {
        const response = await axiosInstance.post("/users", user);
        if (response.status == 409) {
            showWarningAlert(`Conflict - email already exists (error ${response.status})`,
                "Please try again later or contact support.");
            console.error(`Error posting user:`, response.status);
            return response.status;
        }
        return response.status;
    } catch (error) {

        console.error("Error posting user:", error);
        showWarningAlert("Error posting user", "Please try again later or contact support.");
        return -1;
    }
};

export const getDevelopers = async (): Promise<User[]> => {
    const role = getCurrentUserRole();
    if (!role || !checkPermission(role, PermissionAction.READ_USERS)) return [];
    try {
        const allUsers = await getAllUsers();
        return allUsers.filter(user => user.role === UserRole.DEVELOPER);
    } catch (error) {
        console.error("Error fetching developers:", error);
        showWarningAlert("Error fetching developers", "Please try again later or contact support.");
        return [];
    }
};

export const addUser = async (user: User): Promise<number> => {
    const role = getCurrentUserRole();
    if (!role || !checkPermission(role, PermissionAction.CREATE_USERS)) return -1;   
    try {
        const response = await axiosInstance.post("/users", user);
        if(response.status == 409){
            showWarningAlert(`Conflict - email already exists (error ${response.status})`,
            "Please try again later or contact support.");
        }
        return response.status;
    } catch (error) {
        console.error("Error adding user:", error);
        showWarningAlert("Error adding user", "Please try again later or contact support.");
        return -1;
    }
};