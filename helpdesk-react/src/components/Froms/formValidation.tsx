import type { FormField, FormState } from "../../models/froms.model";

export const validateField = (field: FormField, value: string): string => {
    if (field.required && !value.trim()) {
        return `${field.label} is required`;
    }

    if (field.minLength && value.length < field.minLength) {
        return field.errorMessage ?? `Must be at least ${field.minLength} characters`;
    }

    if (field.regex && !field.regex.test(value)) {
        return field.errorMessage ?? "Invalid format";
    }

    return "";
};

export const validateForm = (formState: FormState): FormState => {
    const updated: FormState = {};

    for (const key in formState) {
        const field = formState[key];
        const error = validateField(field, field.value);

        updated[key] = {
            ...field,
            touched: true,
            error,
        };
    }

    return updated;
};

export const isFormValid = (formState: FormState): boolean =>
    Object.values(formState).every(f => !f.error);
