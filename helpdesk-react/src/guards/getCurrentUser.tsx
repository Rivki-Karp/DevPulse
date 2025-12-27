import { UserRole } from "../models/user.model";
import { store } from "../store/store";

export const getCurrentUserRole = (): UserRole | undefined => {
    return store.getState().auth.user?.role;
};