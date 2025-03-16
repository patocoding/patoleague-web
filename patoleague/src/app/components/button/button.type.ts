import { ReactNode } from "react"

export type TButton = {
    children?: ReactNode;
    disabled?: boolean;
    hierarchy?: "primary" | "secondary" | "tertiary"
    onClick?: () => void;
    className?: string;
    fontSize?: number;
}