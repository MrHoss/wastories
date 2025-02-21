import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface ButtonProps {
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  size?: keyof Theme["spacing"];
  style?: CSSProperties;
}

const Button = styled.button<ButtonProps>(({ theme, color = "primary", size, style }: ButtonProps & { theme: Theme }) => ({
  cursor: "pointer",
  color: theme.palette[color].light,
  backgroundColor: "transparent",
  padding: theme.spacing[size as keyof Theme['spacing']] || size || 4,
  minWidth: 34,
  minHeight: 34,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[1],
  borderRadius: theme.components?.Button?.styleOverrides?.borderRadius || 12,
  transition: "all 0.5s ease",
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: "#303840"
  },
  '&:active': {
    backgroundColor: theme.palette.action.active,
  },
  '&:focus': {
    backgroundColor: theme.palette.action.focus,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
  },
  ...style,
  ...theme.components?.Button?.styleOverrides as CSSProperties | undefined
}));

export default Button;