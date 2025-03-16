
import type { TButton } from "./button.type"
import clsx from "clsx";
export default function PlButton({
        children,
        disabled = false,
        hierarchy = 'primary',
        onClick,
        className,
        fontSize
    }: TButton) {
   
    const BtnClass = clsx(
         `justify-center px-6 py-2 rounded-2xl text-[${fontSize}px] font-bold transition duration-200 flex items-center gap-x-4`,
         {
            "bg-white text-orange-500 hover:bg-orange-500 hover:text-white": hierarchy === "primary",
            "bg-orange-500 text-white hover:text-orange-500 hover:bg-white": hierarchy === "secondary",
            "border border-black text-black hover:bg-gray-100": hierarchy === "tertiary",
            "opacity-50 cursor-not-allowed": disabled, 
         },
         className
    )

    return (
        <button className={BtnClass} onClick={onClick} disabled={disabled}>
                {children}
        </button>      
    )
}