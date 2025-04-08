'use client'
import React, { useState } from 'react'

export default function Donate() {
  const amounts = ["1", "5", "10"]
  const [message, setMessage] = useState<string>("")
  const [selectedAmount, setSelectedAmount] = useState<string>("")

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount)
  }
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  return (
    <div className='mt-6 '>
      <div className='bg-[#0c2f37] p-4 rounded-lg shadow-md w-fit '>
        <h2 className='text-lg font-bold mb-4 text-white'>Doe para Pato League</h2>
        <div className='mt-4 flex flex-col gap-y-4'>
          <p className='text-sm text-white'>Escolha um valor para doar:</p>
          <div className='flex gap-x-4'>
            <div className='flex gap-x-4'>
            {amounts.map((amount) => (
              <button key={amount} onClick={()=> handleAmountClick(amount)} className='bg-[#c2f8e3]  hover:bg-[#e0d1c6] text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300'>
                R$ {amount}
              </button>
            ))}
            </div>
            <div className=''>
              <input type='text' placeholder='R$ 0,00' value={selectedAmount} className='border border-gray-300 font-bold rounded-lg p-2 w-32 mt-2'/>
            </div>
          </div>
          <div>
            <textarea value={message} onChange={handleMessageChange} className='border border-gray-300 rounded-lg p-2 w-full h-24 mt-2' placeholder='Deixe uma mensagem'></textarea>
          </div>
        </div>
        <div>
          <button className='bg-[#c2f8e3] hover:bg-[#e0d1c6] text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 mt-4'>
            Doar
          </button>
        </div>
      </div>
    </div>
  )
}
