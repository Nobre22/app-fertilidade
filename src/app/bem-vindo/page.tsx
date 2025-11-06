'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BemVindo() {
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🎉 Pagamento Confirmado!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Bem-vinda ao <span className="font-bold text-pink-600">FertilCare</span>!
          </p>
          
          <p className="text-gray-500">
            Seu acesso foi liberado com sucesso.
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            ✨ Você agora tem acesso a:
          </h3>
          <ul className="text-left space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Calendário menstrual completo
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Protocolo Detox (8 semanas)
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Protocolo avançado de concepção
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Guia completo de relação sexual
            </li>
          </ul>
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 mb-4"
        >
          🚀 Acessar o App Agora
        </button>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Redirecionando em {countdown} segundos...</span>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            💡 <strong>Dica:</strong> Se já tinha conta, faça login com o mesmo email.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Problemas? Entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  )
}
