import type { ChangeEvent, FormEvent } from "react";
import type { FormField, FormState } from "../../models/froms.model";

export const validateField = (field: FormField, value: string): string => {
    if (field.required && !value) {
        return `${field.label} is required`;
    }
    
    if (value && field.minLength && value.length < field.minLength) {
        return field.errorMessage || `Must be at least ${field.minLength} characters`;
    }
    
    if (value && field.regex && !field.regex.test(value)) {
        return field.errorMessage || "Invalid format";
    }
    
    return "";
};

interface AuthFormProps {
    formState: FormState;
    onFormChange: (updatedForm: FormState) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    buttonText: string;
}

export function AuthForm({ formState, onFormChange, onSubmit, buttonText }: AuthFormProps) {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const currentField = formState[name];
        
        if (!currentField) return;
        
        const updatedForm: FormState = {
            ...formState,
            [name]: {
                ...currentField,
                value,
                touched: true,
                error: validateField(currentField, value)
            }
        };
        
        onFormChange(updatedForm);
    };

    const renderFormField = (fieldName: string, field: FormField) => (
        <div key={fieldName}>
            <label htmlFor={fieldName}>
                {field.label}
                {field.required && <span> *</span>}
            </label>
            
            <input
                id={fieldName}
                name={fieldName}
                type={field.type}
                value={field.value}
                onChange={handleInputChange}
            />
            
            {field.touched && field.error && (
                <span>{field.error}</span>
            )}
        </div>
    );

    return (
        <form onSubmit={onSubmit}>
            {Object.entries(formState).map(([fieldName, field]) => 
                renderFormField(fieldName, field)
            )}
            
            <button type="submit">
                {buttonText}
            </button>
        </form>
    );
}