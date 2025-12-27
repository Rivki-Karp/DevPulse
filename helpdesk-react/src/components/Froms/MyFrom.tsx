import type { ChangeEvent, FormEvent } from "react";
import { validateForm, isFormValid, validateField } from "./formValidation";
import { Box, Button, CircularProgress } from "@mui/material";
import type{ FormField} from "../../models/froms.model";
import FormInput from "./FormInput";

interface FormState {
    [key: string]: FormField;
}

interface MyFormProps {
    formState: FormState;
    onFormChange: (formState: FormState) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    buttonText: string;
    isLoading?: boolean;
}

export function MyForm({ formState, onFormChange, onSubmit, buttonText, isLoading = false }: MyFormProps) {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!formState[name]) return;

        onFormChange({
            ...formState,
            [name]: {
                ...formState[name],
                value,
                touched: true,
                error: validateField(formState[name], value),
            },
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validatedForm = validateForm(formState);
        onFormChange(validatedForm);

        if (!isFormValid(validatedForm)) return;

        onSubmit(e);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {Object.entries(formState).map(([name, field]) => (
                <FormInput
                    key={name}
                    name={name}
                    field={field}
                    onChange={handleInputChange}
                />
            ))}
            <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : buttonText}
            </Button>
        </Box>
    );
}
export default MyForm;
