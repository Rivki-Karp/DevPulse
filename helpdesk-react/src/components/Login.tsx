import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Container, Paper, Typography, Box } from "@mui/material";

import { MyForm } from "./Froms/MyFrom";
import type { FormState } from "../models/froms.model";
import { setCredentials } from "../store/authSlice";
import { postLoginUser } from "../service/Authentication";
import { FormUserField } from "./Register";

const loginForm: FormState = {
    email: FormUserField.email,
    password: FormUserField.password,
};

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formState, setFormState] = useState<FormState>(loginForm);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);

        const response = await postLoginUser({
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
                        Welcome Back
                    </Typography>

                    <MyForm
                        formState={formState}
                        onFormChange={setFormState}
                        onSubmit={handleSubmit}
                        buttonText="Login"
                        isLoading={isLoading}
                    />

                    <Typography align="center" sx={{ mt: 2 }}>
                        Don&apos;t have an account?{" "}
                        <Link to="/register">Register here</Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
