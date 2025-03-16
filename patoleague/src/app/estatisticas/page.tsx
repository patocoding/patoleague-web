'use client'
import { useRouter } from "next/navigation";
import PlButton from "../components/button/button";

export default function StatsPage() {
    const router = useRouter()
    return (
        <div className="italic flex flex-col items-center justify-center mt-20">
            Página de Estatísticas em Desenvolvimento...
            <PlButton onClick={() => router.back() } className="w-fit">Voltar</PlButton>
        </div>
    )
}