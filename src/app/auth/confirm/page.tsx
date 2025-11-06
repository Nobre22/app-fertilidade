'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function ConfirmPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmEmail = async () => {
      const supabase = createClient()
      
      // Pegar os parâmetros da URL
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type')
      
      if (token_hash && type) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          })

          if (error) {
            setStatus('error')
            setMessage('Erro ao confirmar e-mail. O link pode ter expirado.')
          } else {
            setStatus('success')
            setMessage('E-mail confirmado com sucesso!')
            
            // Redirecionar para dashboard após 3 segundos
            setTimeout(() => {
              router.push('/dashboard')
            }, 3000)
          }
        } catch (error) {
          setStatus('error')
          setMessage('Erro inesperado ao confirmar e-mail.')
        }
      } else {
        setStatus('error')
        setMessage('Link de confirmação inválido.')
      }
    }

    confirmEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Confirmação de E-mail
          </h2>
        </div>
        
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <div className="flex flex-col items-center space-y-4">
            {status === 'loading' && (
              <>
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                <p className="text-gray-600">Confirmando seu e-mail...</p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-green-600 font-medium">{message}</p>
                <p className="text-sm text-gray-500">
                  Você será redirecionado para o dashboard em alguns segundos...
                </p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <XCircle className="h-12 w-12 text-red-500" />
                <p className="text-red-600 font-medium">{message}</p>
                <button
                  onClick={() => router.push('/auth/login')}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Voltar ao Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}