"use client";

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

  const stats = [
    { label: 'Protocolos Ativos', value: '2', icon: BookOpen },
    { label: 'Dias do Ciclo', value: '28', icon: Calendar },
    { label: 'Dia Fértil', value: '14', icon: Target },
    { label: 'Progresso Geral', value: '75%', icon: TrendingUp },
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

  const recentActivities = [
    { text: 'Protocolo Feminino iniciado', time: '2 horas atrás', type: 'protocol' },
    { text: 'Ciclo menstrual registrado', time: '1 dia atrás', type: 'cycle' },
    { text: 'Perfil atualizado', time: '3 dias atrás', type: 'profile' },
    { text: 'Detox Semana 2 concluída', time: '5 dias atrás', type: 'detox' }
  ];

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
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
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
                      <div
                        key={index}
                        className="group cursor-pointer p-4 rounded-lg border hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                            <action.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Progresso dos Protocolos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Protocolo Feminino Avançado</span>
                        <Badge variant="secondary">Em andamento</Badge>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">65% completo - 8 de 12 semanas</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Detox para Fertilidade</span>
                        <Badge variant="default">Ativo</Badge>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">85% completo - Semana 6 de 8</p>
                    </div>
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

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              {/* Next Fertile Window */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Próxima Janela Fértil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-800">5 dias</p>
                    <p className="text-sm text-green-600">Estimativa baseada no seu ciclo</p>
                    <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                      Ver Calendário
                    </Button>
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