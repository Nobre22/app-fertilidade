'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Paywall({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    checkSubscription()
  }, [])

  async function checkSubscription() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao verificar assinatura:', error)
      }

      setIsSubscribed(subscription?.status === 'active')
    } catch (error) {
      console.error('Erro:', error)
      setIsSubscribed(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isSubscribed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              🔒 Conteúdo Exclusivo
            </h2>
            <p className="text-gray-600">
              Assine agora para ter acesso completo ao FertilCare
            </p>
          </div>

          <div className="bg-pink-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              ✨ O que você terá acesso:
            </h3>
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>📅 Calendário menstrual inteligente com período fértil</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>🌿 Protocolo Detox completo (8 semanas) para casal</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>💊 Protocolo avançado com fórmulas magistrais</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>❤️ Guia completo: pré, durante e pós-relação</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>💝 Posições que favorecem a concepção</span>
              </li>
            </ul>
          </div>

          <a
            href="https://pay.kiwify.com.br/SEU-LINK-AQUI"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 mb-3"
          >
            🚀 Assinar Agora
          </a>

          <p className="text-sm text-gray-500">
            🔒 Pagamento seguro via Kiwify
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
