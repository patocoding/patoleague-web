import { TModal } from "./modal.type"

export default function PlModal({
    isOpen,
    onClose,
    children
} : TModal) {

    if (!isOpen) return null

    return (
        <>
        <div className="fixed  inset-0 flex items-center justify-center overflow-auto p-4 bg-black bg-opacity-50 z-50">
            <div className="bg-white  p-6 rounded-lg shadow-lg w-96 relative">
            {/* Botão de Fechar */}
            <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
            ✖
            </button>

            {/* Conteúdo do Modal */}
            {children}
        </div>
        </div>
        </>
    )
}