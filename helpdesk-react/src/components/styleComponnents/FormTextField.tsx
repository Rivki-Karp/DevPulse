import { TextField,type TextFieldProps } from "@mui/material";

interface FormTextFieldProps {
  name: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  select?: boolean;
  options?: Array<{ id: number; name: string }>;
  children?: React.ReactNode;
  fullWidth?: boolean;
  InputProps?: TextFieldProps["InputProps"];
  sx?: TextFieldProps["sx"];
}

function FormTextField({
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  multiline = false,
  rows,
  select = false,
  children,
  fullWidth = true,
  InputProps,
  sx,
}: FormTextFieldProps) {
  const displayLabel = label || name.charAt(0).toUpperCase() + name.slice(1);
  
  return (
    <TextField
      name={name}
      label={displayLabel}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      multiline={multiline}
      rows={rows}
      select={select}
      fullWidth={fullWidth}
      InputProps={InputProps}
      sx={sx}
    >
      {children}
    </TextField>
  );
}

export default FormTextField;
