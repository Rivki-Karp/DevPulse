import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

interface FormButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  sx?: ButtonProps["sx"];
}

function FormButton({
  children,
  type = "button",
  variant = "contained",
  size = "large",
  fullWidth = true,
  disabled = false,
  onClick,
  sx,
}: FormButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      sx={{ fontWeight: 700, ...sx }}
    >
      {children}
    </Button>
  );
}

export default FormButton;
