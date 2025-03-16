import { ReactNode } from "react";

export type TModal = {
    isOpen : boolean;
    onClose : () => void;
    children : ReactNode
}