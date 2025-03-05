import React from "react";
import { Button as MTButton } from "@material-tailwind/react";

interface ButtonProps {
    variant?: "filled" | "outlined" | "gradient" | "text";
    color?: "blue" | "gray" | "red" | "green" | "yellow" | "purple";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset"; // type özelliği eklendi
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
                                                  variant = "filled",
                                                  color = "blue",
                                                  size = "md",
                                                  fullWidth = false,
                                                  disabled = false,
                                                  onClick,
                                                  type = "button", // Varsayılan değer "button" olarak ayarlandı
                                                  children,
                                              }) => {
    return (
        <MTButton
            variant={variant}
            color={color}
            size={size}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={onClick}
            type={type} // type özelliği eklendi
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
        >
            {children}
        </MTButton>
    );
};