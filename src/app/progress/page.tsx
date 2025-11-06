"use client";

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  Target,
  CheckCircle,
  Clock,
  Heart,
  Zap,
  Shield
} from 'lucide-react';

export default function ProgressPage() {
  const { user } = useAuth();

  // Dados zerados para novos usuários
  const progressData = {
    protocolos: {
      feminino: { progresso: 0, ativo: false },
      masculino: { progresso: 0, ativo: false },
      detox: { progresso: 0, ativo: false }
    },
    ciclo: {
      diasCiclo: 0,
      diaFertil: 0,
      proximaOvulacao: 0
    },
    geral: {
      progressoGeral: 0,
      metasAlcancadas: 0,
      totalMetas: 0
    }
  };

  const protocolCards = [
    {
      name: 'Protocolo Feminino',
      progress: progressData.protocolos.feminino.progresso,
      isActive: progressData.protocolos.feminino.ativo,
      icon: Heart,
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Protocolo Masculino', 
      progress: progressData.protocolos.masculino.progresso,
      isActive: progressData.protocolos.masculino.ativo,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Detox Fertilidade',
      progress: progressData.protocolos.detox.progresso,
      isActive: progressData.protocolos.detox.ativo,
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen pb-20 lg:pb-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Activity className="w-6 h-6 text-pink-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Progresso
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Overview Card */}
          <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Acompanhamento Geral
              </CardTitle>
              <CardDescription className="text-pink-100">
                Visualize seu progresso na jornada para a maternidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{progressData.geral.progressoGeral}%</p>
                  <p className="text-sm opacity-90">Progresso Geral</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{progressData.geral.metasAlcancadas}/{progressData.geral.totalMetas}</p>
                  <p className="text-sm opacity-90">Metas Alcançadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{progressData.ciclo.diasCiclo}</p>
                  <p className="text-sm opacity-90">Dias do Ciclo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Protocolos Progress */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Protocolos Ativos</h2>
              
              {protocolCards.map((protocol, index) => {
                const IconComponent = protocol.icon;
                
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${protocol.color} rounded-lg flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{protocol.name}</CardTitle>
                            <CardDescription>
                              {protocol.isActive ? 'Em andamento' : 'Não iniciado'}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={protocol.isActive ? "default" : "secondary"}>
                          {protocol.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso:</span>
                          <span>{protocol.progress}%</span>
                        </div>
                        <Progress value={protocol.progress} className="h-2" />
                        {protocol.progress === 0 && (
                          <p className="text-xs text-gray-500">
                            Inicie este protocolo para começar a acompanhar seu progresso
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Cycle Tracking */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Acompanhamento do Ciclo</h2>
              
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Ciclo Menstrual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Dias do Ciclo:</span>
                      <span className="font-semibold text-green-800">
                        {progressData.ciclo.diasCiclo || 'Não registrado'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Dia Fértil Estimado:</span>
                      <span className="font-semibold text-green-800">
                        {progressData.ciclo.diaFertil || 'Não calculado'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Próxima Ovulação:</span>
                      <span className="font-semibold text-green-800">
                        {progressData.ciclo.proximaOvulacao ? `${progressData.ciclo.proximaOvulacao} dias` : 'Não prevista'}
                      </span>
                    </div>
                  </div>
                  {progressData.ciclo.diasCiclo === 0 && (
                    <div className="mt-4 p-3 bg-white rounded-lg">
                      <p className="text-sm text-green-800">
                        💡 Registre suas datas menstruais para começar a acompanhar seu ciclo
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Goals Card */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Metas e Objetivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {progressData.geral.totalMetas === 0 ? (
                      <div className="text-center py-4">
                        <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-blue-700">
                          Suas metas aparecerão aqui quando você iniciar os protocolos
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Metas Concluídas:</span>
                          <span className="font-semibold text-blue-800">
                            {progressData.geral.metasAlcancadas}/{progressData.geral.totalMetas}
                          </span>
                        </div>
                        <Progress 
                          value={progressData.geral.totalMetas > 0 ? (progressData.geral.metasAlcancadas / progressData.geral.totalMetas) * 100 : 0} 
                          className="h-2" 
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-purple-700">
                      Suas conquistas aparecerão aqui conforme você progride nos protocolos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Getting Started */}
          {progressData.geral.progressoGeral === 0 && (
            <Card className="mt-6 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <Target className="w-5 h-5" />
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
                    <span>Registre suas datas menstruais no calendário</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Acompanhe seu progresso diariamente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}