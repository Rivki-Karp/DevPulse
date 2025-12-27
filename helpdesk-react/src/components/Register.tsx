import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Container, Paper, Typography, Box } from "@mui/material";

import { MyForm } from "./Froms/MyFrom";
import type { FormState } from "../models/froms.model";
import { setCredentials } from "../store/authSlice";
import { postRegisterUser } from "../service/Authentication";

export const FormUserField: FormState = {
    firstName: {
        label: "First Name",
        value: "",
        type: "text",
        required: true,
        touched: false,
        error: "",
        regex: /^[a-zA-Zא-ת]{2,}$/,
        errorMessage: "Must contain at least 2 letters only",
        minLength: 2
    },
    lastName: {
        label: "Last Name",
        value: "",
        type: "text",
        required: true,
        touched: false,
        error: "",
        regex: /^[a-zA-Zא-ת]{2,}$/,
        errorMessage: "Must contain at least 2 letters only",
        minLength: 2
    },
    email: {
        label: "Email",
        value: "",
        type: "email",
        required: true,
        touched: false,
        error: "",
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email format"
    },
    password: {
        label: "Password",
        value: "",
        type: "password",
        required: true,
        touched: false,
        error: "",
        regex: /^.{6,}$/,
        errorMessage: "Password must be at least 6 characters",
        minLength: 6
    },
    address: {
        label: "Address",
        value: "",
        type: "text",
        required: false,
        touched: false,
        error: "",
    }
};

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formState, setFormState] = useState<FormState>(FormUserField);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);

        const response = await postRegisterUser({
            name: `${formState.firstName.value} ${formState.lastName.value}`,
            email: formState.email.value,
            password: formState.password.value,
        });

        setIsLoading(false);

        if (!response) {
            return;
        }

        const { user, token } = response;
        dispatch(setCredentials({ user, token }));
        navigate("/dashboard");
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Join DevPulse
                    </Typography>

                    <MyForm
                        formState={formState}
                        onFormChange={setFormState}
                        onSubmit={handleSubmit}
                        buttonText="Create Account"
                        isLoading={isLoading}
                    />

                    <Typography align="center" sx={{ mt: 2 }}>
                        Already have an account?{" "}
                        <Link to="/login">Login here</Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}

export default Register;
