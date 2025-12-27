import showWarningAlert from "../components/styleComponnents/myAlert";
import type { User } from "../models/user.model";
import axiosInstance from "./axiosInstance";

export interface Login {
    email: string,
    password: string
}
export interface Register {
    name: string,
    email: string,
    password: string
}
export interface AuthResponse {
    token: string;
    user: User;
}
export const postLoginUser = async (loginData: Login): Promise<AuthResponse|null> => {
    try {
        const response = await axiosInstance.post( '/auth/login', loginData );
        if (response.status == 401) {
            showWarningAlert("Login Failed", "Unauthorized access");
            console.error("Unauthorized access");
            return null;
        }
        return response.data as AuthResponse;
    } catch (error) {
        showWarningAlert("Login Failed", "Unauthorized access");
        console.error("Unauthorized access:", error);
        return null;
    }
};

export const postRegisterUser = async (registerData: Register): Promise<AuthResponse|null> => {
    try {
        const response = await axiosInstance.post('/auth/register', registerData);
        if (response.status == 409) {
            showWarningAlert("Register Failed", "Conflict: User already exists");
            console.error("Conflict: User already exists");
            return null;
        }
        return response.data as AuthResponse;
    } catch (error) {
        showWarningAlert("Register Failed", "Unauthorized access");
        console.error("Unauthorized access:", error);
        return null;
    }
};

export const getMyUser = async (): Promise<User|null> => {
    try {
        const response = await axiosInstance.get('/auth/me');
        if(response.status == 401) {
            showWarningAlert("Fetch User Failed", "Unauthorized access");
            console.error("Unauthorized access");
            return null;
        }
        return response.data as User;
    } catch (error) {
        showWarningAlert("Fetch User Failed", "Unauthorized access");
        console.error("Unauthorized access:", error);
        return null;
    }
}