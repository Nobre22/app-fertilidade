"use client";

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Calendar, 
  Users, 
  BookOpen, 
  Sparkles, 
  Baby, 
  User,
  ChevronRight,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Dados zerados para novos usuários
  const stats = [
    { label: 'Protocolos Ativos', value: '0', icon: BookOpen },
    { label: 'Dias do Ciclo', value: '0', icon: Calendar },
    { label: 'Dia Fértil', value: '0', icon: Target },
    { label: 'Progresso Geral', value: '0%', icon: TrendingUp },
  ];

  const quickActions = [
    {
      title: 'Registrar Ciclo',
      description: 'Adicionar nova data de menstruação',
      href: '/calendar',
      icon: Calendar,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Ver Protocolos',
      description: 'Acompanhar seus protocolos ativos',
      href: '/protocols',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Atualizar Perfil',
      description: 'Gerenciar informações do casal',
      href: '/profile',
      icon: Users,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Guias Sexuais',
      description: 'Dicas para otimizar a concepção',
      href: '/guides',
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    }
  ];

  // Atividades zeradas para novos usuários
  const recentActivities: any[] = [];

  const handleQuickAction = (href: string) => {
    router.push(href);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pb-20 lg:pb-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <Baby className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    FertilCare
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Sua jornada para a maternidade</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 h-7"
                >
                  Sair
                </Button>
                <button
                  onClick={() => router.push('/profile')}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <User className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Olá! Bem-vinda ao FertilCare
              </CardTitle>
              <CardDescription className="text-pink-100">
                Acompanhe sua jornada para a maternidade com nossos protocolos personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.href)}
                        className="group cursor-pointer p-4 rounded-lg border hover:shadow-lg transition-all duration-200 hover:border-pink-200 hover:bg-pink-50/50 text-left w-full"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <action.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors group-hover:translate-x-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Overview - Zerado para novos usuários */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Progresso dos Protocolos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Nenhum protocolo ativo</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Inicie um protocolo para começar a acompanhar seu progresso
                    </p>
                    <Button 
                      onClick={() => router.push('/protocols')}
                      className="bg-pink-500 hover:bg-pink-600"
                    >
                      Ver Protocolos Disponíveis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dica de Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold text-pink-800 mb-1">💊 Suplementação</h4>
                      <p className="text-sm text-pink-700">
                        Não esqueça de tomar seu ácido fólico hoje! É essencial para a formação do tubo neural.
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-1">🌡️ Temperatura</h4>
                      <p className="text-sm text-blue-700">
                        Meça sua temperatura basal ao acordar para identificar a ovulação.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity - Zerado para novos usuários */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentActivities.length === 0 ? (
                    <div className="text-center py-4">
                      <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Suas atividades aparecerão aqui conforme você usa o app
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.text}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Next Fertile Window - Zerado para novos usuários */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Próxima Janela Fértil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-green-600 mb-3">
                      Registre suas datas menstruais para calcular sua janela fértil
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => router.push('/calendar')}
                    >
                      Registrar Ciclo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Getting Started Guide */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Como Começar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-yellow-800">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Complete seu perfil com informações básicas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Inicie um protocolo adequado ao seu perfil</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Registre suas datas menstruais</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Acompanhe seu progresso diariamente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}