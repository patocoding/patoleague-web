'use client'
import Image from "next/image";
import Form from "next/form";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";

export default function Auth() {
    const router = useRouter();
    const { handleLogin} = useAuthentication()
    const [ isLogin, setIsLogin ] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)

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
                const response = await axios.post('http://localhost:3333/user', {
                    fullName,
                    email,
                    password
                });
    
                if (response.status === 201 || response.status === 200) {
                   
                    router.push('/');
                    
                }
            } else {
                const loginResponse = await axios.post('http://localhost:3333/auth/login', {
                    email,
                    password,
                })

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
            console.error("Erro ao criar conta:", error);
        }
    }

    const setView = () => {
        setIsLogin(!isLogin)
     }

    return (
        <div className=" ">
            <div className="p-10 justify-center flex">
                <Image src="/img/basketball.png" alt="basketball" width={120} height={120}/>
            </div>
            <div className="flex items-center justify-center flex-col">
                <div className="font-bold heading text-3xl text-center">
                    <p>{isLogin ? 'Entre na' : 'Crie'} sua conta <br/> Pato League&copy;</p>
                </div>
                <div className="downtext text-sm py-4">
                    <p>Preencha com suas informações para {isLogin ? 'entrar na sua' : 'criar uma'} conta</p>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <Form action="" onSubmit={handleSubmit}>
                    <div className="flex justify-center flex-col">
                       {!isLogin &&  (
                        <input type="text" name="fullName" className="p-8 input rounded-tl-xl rounded-tr-xl border-b-2 font-[Inter] border-[#e3e4e7]" placeholder="Nome Completo" required />
                       )}
                        <input type="email" name="email" className="p-8 input border-b-2 font-[Inter] border-[#e3e4e7]" placeholder="E-mail" required />
                        <input type="password" name="password" className="p-8 input font-[Inter] border-b-2 border-[#e3e4e7]" placeholder="Senha" required />
                        <button type="submit" className="p-8 font-[Inter] bg-[#d87d33] rounded-bl-xl rounded-br-xl font-semibold">{loading ? 'Carregando...' : 'Continuar'}</button>
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                        )}                    
                    </div>
                </Form>
            </div>
            <div className="flex font-[Inter] items-center p-4">
                <div className="h-[1px] bg-slate-300 w-full"></div>
                <p className="mx-4">ou</p>
                <div className="h-[1px] bg-slate-300 w-full"></div>
            </div>
            <div className="flex gap-x-8 justify-center">
                <div className="input p-8 rounded-xl">oi</div>
                <div className="input p-8 rounded-xl">oi</div>
                <div className="input p-8 rounded-xl">oi</div>
            </div>
            <div className="flex gap-x-2 justify-center items-center font-[Inter] my-8">
                <p></p>
                <button onClick={setView} className="">{isLogin ? 'Ainda não tem uma conta? Crie' : 'Já tem uma conta?'} 
                <span className="underline font-bold ml-1">{isLogin ? ' Aqui' : 'Faça Login'}</span></button>
            </div>
        </div>
    );
}