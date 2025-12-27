import type { ChangeEvent } from "react";
import type { FormField } from "../../models/froms.model";
import { TextField } from "@mui/material";

export interface FormInputProps {
    name: string;
    field: FormField;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormInput({ name, field, onChange }: FormInputProps) {
    return (
        <>
            <TextField
                fullWidth
                margin="normal"
                label={field.label}
                name={name}
                type={field.type}
                value={field.value}
                onChange={onChange}
                required={field.required}
                error={field.touched && !!field.error}
                helperText={field.touched && field.error}
                autoComplete={name}
            />

        </>
    );
}
export default FormInput;
