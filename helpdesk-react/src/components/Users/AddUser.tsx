import { Dialog, DialogTitle, DialogContent, TextField, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { UserRole, type User, ROLE_DISPLAY_NAMES } from "../../models/user.model";
import { addUser } from "../../service/Users";
import { showSuccessAlert, showWarningAlert } from "../styleComponnents/myAlert";
import { MyForm } from "../Froms/MyFrom";
import type { FormState } from "../../models/froms.model";
import { FormUserField } from "../Register";

const AddUserFormFields: FormState = {
  ...FormUserField
};

interface AddUserProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

function AddUser({ open, onClose, onSuccess }: AddUserProps) {
    const [formState, setFormState] = useState<FormState>(AddUserFormFields);
    const [selectedRole, setSelectedRole] = useState<string>(UserRole.DEVELOPER);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasErrors = Object.values(formState).some(
            field => field.error !== "" || (field.required && !field.value)
        );
        
        if (hasErrors) {
            showWarningAlert("Validation Error", "Please fill all fields correctly.");
            return;
        }

        setIsLoading(true);

        const newUser: User = {
            id: "",
            name: `${formState.firstName.value} ${formState.lastName.value}`,
            email: formState.email.value,
            password: formState.password.value,
            role: selectedRole as UserRole,
            is_active: true,
            createdAt: new Date().toISOString(),
        };

        const status = await addUser(newUser);

        setIsLoading(false);

        if (status === 201 || status === 200) {
            showSuccessAlert("Success!", "User created successfully");
            setFormState(AddUserFormFields);
            setSelectedRole(UserRole.DEVELOPER);
            onSuccess();
            onClose();
        } else if (status === 409) {
            showWarningAlert("Email already exists", "Please use a different email address.");
        } else {
            showWarningAlert("Error", "Failed to create user");
        }
    };

    const handleClose = () => {
        setFormState(AddUserFormFields);
        setSelectedRole(UserRole.DEVELOPER);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
                Add New User
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 2 }}>
                    <MyForm 
                        formState={formState}
                        onFormChange={setFormState}
                        onSubmit={handleSubmit}
                        buttonText="Create User"
                        isLoading={isLoading}
                    />
                    
                    <TextField
                        select
                        fullWidth
                        label="Role"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        required
                    >
                        {Object.values(UserRole).map((role) => (
                            <MenuItem key={role} value={role}>
                                {ROLE_DISPLAY_NAMES[role] || role}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default AddUser;
