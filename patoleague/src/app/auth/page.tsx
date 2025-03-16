'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import api from "@/config/axios";

export default function Auth() {
    const router = useRouter();
    const { handleLogin } = useAuthentication();
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const fullName = formData.get('fullName') as string;
        const password = formData.get('password') as string;

        try {
            if (!isLogin) {
                // Cadastro
                const response = await api.post('/user', { fullName, email, password });

                if (response.status === 201 || response.status === 200) {
                    router.push('/');
                }
            } else {
                // Login
                const loginResponse = await api.post('/auth/login', { email, password });

                if (loginResponse.status === 201 || loginResponse.status === 200) {
                    handleLogin(
                        loginResponse.data.user.id,
                        loginResponse.data.user.fullName,
                        loginResponse.data.user.email,
                        loginResponse.data.access_token
                    );
                    router.push('/');
                }
            }
        } catch (error) {
            setErrorMessage("Ocorreu um erro. Verifique seus dados e tente novamente.");
            console.error("Erro ao autenticar:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="p-10 flex justify-center">
                <Image src="/img/basketball.png" alt="basketball" width={120} height={120} />
            </div>

            {/* Título */}
            <div className="flex flex-col items-center text-center">
                <h2 className="font-bold text-3xl">
                    {isLogin ? 'Entre na' : 'Crie'} sua conta <br/> Pato League&copy;
                </h2>
                <p className="text-sm py-4">
                    Preencha com suas informações para {isLogin ? 'entrar na sua' : 'criar uma'} conta
                </p>
            </div>

            {/* Formulário */}
            <div className="w-full max-w-sm p-4">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {!isLogin && (
                        <input 
                            type="text" 
                            name="fullName" 
                            className="p-4 border border-gray-300 rounded-t-md" 
                            placeholder="Nome Completo" 
                            required 
                        />
                    )}
                    <input 
                        type="email" 
                        name="email" 
                        className="p-4 border border-gray-300" 
                        placeholder="E-mail" 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        className="p-4 border border-gray-300 rounded-b-md" 
                        placeholder="Senha" 
                        required 
                    />
                    
                    <button 
                        type="submit" 
                        className="p-4 bg-[#d87d33] text-white font-semibold mt-4 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Carregando...' : 'Continuar'}
                    </button>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                    )}
                </form>
            </div>

            {/* Linha divisória */}
            <div className="flex items-center w-full max-w-sm px-4">
                <div className="h-[1px] bg-gray-300 flex-grow"></div>
                <p className="mx-4 text-sm">ou</p>
                <div className="h-[1px] bg-gray-300 flex-grow"></div>
            </div>

            {/* Alternar entre Login/Cadastro */}
            <div className="flex justify-center mt-4">
                <button onClick={() => setIsLogin(!isLogin)} className="text-sm">
                    {isLogin ? 'Ainda não tem uma conta? ' : 'Já tem uma conta? '}
                    <span className="underline font-bold">{isLogin ? 'Crie aqui' : 'Faça login'}</span>
                </button>
            </div>
        </div>
    );
}
