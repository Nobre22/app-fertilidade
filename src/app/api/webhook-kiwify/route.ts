import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('🔔 Webhook Kiwify recebido:', JSON.stringify(body, null, 2))

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const customerEmail = 
      body.Customer?.email || 
      body.customer?.email || 
      body.customer_email ||
      body.email

    if (!customerEmail) {
      console.error('❌ Email não encontrado no webhook')
      return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 })
    }

    console.log('📧 Email do cliente:', customerEmail)

    if (
      body.order_status === 'paid' || 
      body.order_status === 'approved' ||
      body.status === 'paid' ||
      body.status === 'approved'
    ) {
      console.log('✅ Pagamento aprovado, ativando assinatura...')

      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

      if (listError) {
        console.error('❌ Erro ao listar usuários:', listError)
        return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 })
      }

      const user = users.find(u => u.email?.toLowerCase() === customerEmail.toLowerCase())

      if (!user) {
        console.log('⚠️ Usuário não encontrado.')
        return NextResponse.json({ 
          message: 'Usuário não encontrado, crie a conta no app primeiro',
          email: customerEmail 
        }, { status: 404 })
      }

      console.log('👤 Usuário encontrado:', user.id)

      const { error: upsertError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          status: 'active',
          kiwify_order_id: body.order_id || body.id,
          started_at: new Date().toISOString(),
          expires_at: null,
        }, {
          onConflict: 'user_id'
        })

      if (upsertError) {
        console.error('❌ Erro ao ativar assinatura:', upsertError)
        return NextResponse.json({ error: 'Erro ao ativar assinatura' }, { status: 500 })
      }

      console.log('🎉 Assinatura ativada com sucesso para:', customerEmail)
      
      return NextResponse.json({ 
        success: true,
        message: 'Assinatura ativada',
        email: customerEmail,
        user_id: user.id
      })
    }

    if (
      body.order_status === 'refunded' || 
      body.order_status === 'cancelled' ||
      body.status === 'refunded' ||
      body.status === 'cancelled'
    ) {
      console.log('❌ Cancelamento/Reembolso detectado, desativando assinatura...')

      const { data: { users } } = await supabase.auth.admin.listUsers()
      const user = users.find(u => u.email?.toLowerCase() === customerEmail.toLowerCase())

      if (user) {
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({ status: 'inactive' })
          .eq('user_id', user.id)

        if (updateError) {
          console.error('❌ Erro ao desativar assinatura:', updateError)
        } else {
          console.log('🔒 Assinatura desativada para:', customerEmail)
        }
      }

      return NextResponse.json({ 
        success: true,
        message: 'Assinatura desativada',
        email: customerEmail
      })
    }

    console.log('ℹ️ Evento não processado:', body.order_status || body.status)
    return NextResponse.json({ message: 'Evento recebido mas não processado' })

  } catch (error) {
    console.error('❌ Erro no webhook:', error)
    return NextResponse.json({ 
      error: 'Erro interno no servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook Kiwify endpoint está funcionando!',
    timestamp: new Date().toISOString()
  })
}

