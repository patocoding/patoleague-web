import Image from "next/image";
import Form from "next/form";
export default function Auth() {
    return (
      <div className=" ">
        <div className="p-10 justify-center flex">
            <Image src="/img/basketball.png" alt="basketball" width={120} height={120}/>
        </div>
        <div className="flex items-center justify-center flex-col">
            <div className="font-bold heading text-3xl text-center">
                <p>Crie sua conta <br/> Pato League&copy;</p>
            </div>
            <div className="downtext text-sm py-4">
               <p> Preencha com suas informações para criar uma conta</p>
            </div>
        </div>
        <div className="flex flex-col p-4">
           <Form action="/">
                <div className="flex justify-center flex-col">
                    <input type="text" className="p-8 input rounded-tl-xl rounded-tr-xl border-b-2 font-[Inter] border-[#e3e4e7]" placeholder="Nome Completo" />
                    <input type="email" className="p-8 input  border-b-2 font-[Inter] border-[#e3e4e7]" placeholder="E-mail" />
                    <input type="password" className="p-8 input font-[Inter]  border-b-2  border-[#e3e4e7]" placeholder="Senha" />
                    <button type="submit" className="p-8 font-[Inter]  bg-[#d87d33] rounded-bl-xl rounded-br-xl font-semibold">Continuar</button>
                </div>
           </Form>
           
           
        </div>
        <div className="flex font-[Inter] items-center p-4">
            <div className="h-[1px] bg-slate-300 w-full"></div>
                <p className="mx-4">ou</p>
                <div className="h-[1px] bg-slate-300 w-full"></div>
           </div>
        <div className="flex gap-x-8 justify-center">
            <div  className="input p-8 rounded-xl">
                oi
            </div>
            <div className="input p-8 rounded-xl">
                oi
            </div>
            <div className="input p-8 rounded-xl">
                oi
            </div>
           </div>
           <div className="flex gap-x-2 justify-center items-center font-[Inter] my-8">
            <p>Já possui uma conta?</p>
            <button className="underline font-bold">Faça Login</button>
           </div>
      </div>
    );
  }