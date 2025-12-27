export interface FormField {
    label: string;
    value: string;
    type: string;
    required: boolean;
    touched: boolean;
    error: string;
    regex?: RegExp;
    errorMessage?: string;
    minLength?: number;
}

export interface FormState {
    [key: string]: FormField;
}