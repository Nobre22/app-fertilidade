"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  ChevronRight, 
  Clock,
  Users,
  Sparkles,
  Target,
  Info,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  description: string;
  content: string[];
  tips: string[];
  icon: any;
}

export default function GuidesPage() {
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState<GuideSection | null>(null);

  const preRelationGuide: GuideSection = {
    id: 'pre-relacao',
    title: 'Preparação Pré-Relação',
    description: 'Dicas e recomendações para otimizar o momento da concepção',
    icon: Clock,
    content: [
      'Identifique sua janela fértil através do calendário menstrual',
      'Monitore sinais de ovulação (muco cervical, temperatura basal)',
      'Mantenha-se hidratada e bem alimentada',
      'Evite estresse excessivo e pratique relaxamento',
      'Certifique-se de que ambos estejam descansados',
      'Crie um ambiente romântico e relaxante',
      'Evite lubrificantes que possam prejudicar os espermatozoides',
      'Mantenha uma comunicação aberta com seu parceiro'
    ],
    tips: [
      'O melhor momento é 1-2 dias antes da ovulação',
      'Relações a cada 2 dias durante a janela fértil são ideais',
      'Evite álcool e tabaco pelo menos 24h antes',
      'Use roupas íntimas de algodão e evite tecidos sintéticos',
      'Pratique exercícios leves para melhorar a circulação'
    ]
  };

  const positionsGuide: GuideSection = {
    id: 'posicoes',
    title: 'Guia de Posições',
    description: 'Posições que podem otimizar as chances de concepção',
    icon: Target,
    content: [
      '1. POSIÇÃO MISSIONÁRIA CLÁSSICA',
      '• Descrição: Mulher deitada de costas, homem por cima',
      '• Benefício: Permite penetração profunda e deposição próxima ao colo do útero',
      '• Dica: Use travesseiro sob os quadris da mulher para melhor ângulo',
      '',
      '2. POSIÇÃO ELEVADA',
      '• Descrição: Mulher com quadris elevados por travesseiros',
      '• Benefício: Gravidade ajuda os espermatozoides a se moverem em direção ao útero',
      '• Dica: Mantenha a posição por 10-15 minutos após a relação',
      '',
      '3. POSIÇÃO DE LADO (COLHER)',
      '• Descrição: Ambos deitados de lado, homem por trás',
      '• Benefício: Posição relaxante que permite penetração profunda',
      '• Dica: Ideal para casais que preferem intimidade mais suave',
      '',
      '4. POSIÇÃO AJOELHADA',
      '• Descrição: Mulher ajoelhada, homem atrás',
      '• Benefício: Permite penetração muito profunda',
      '• Dica: Use almofadas para conforto dos joelhos',
      '',
      '5. POSIÇÃO COM PERNAS ELEVADAS',
      '• Descrição: Mulher deitada com pernas apoiadas nos ombros do parceiro',
      '• Benefício: Maximiza a profundidade e o ângulo de penetração',
      '• Dica: Comunique-se para garantir conforto de ambos'
    ],
    tips: [
      'O mais importante é o conforto e prazer de ambos',
      'Não existe posição "mágica" - o essencial é a ejaculação próxima ao colo do útero',
      'Varie as posições para manter a intimidade interessante',
      'Foque na conexão emocional, não apenas na técnica',
      'Consulte seu médico se houver desconforto em qualquer posição'
    ]
  };

  const postRelationGuide: GuideSection = {
    id: 'pos-relacao',
    title: 'Cuidados Pós-Relação',
    description: 'Instruções importantes após a relação sexual',
    icon: CheckCircle,
    content: [
      'IMEDIATAMENTE APÓS (0-15 minutos):',
      '• Permaneça deitada por 10-15 minutos',
      '• Mantenha os quadris ligeiramente elevados',
      '• Evite levantar ou ir ao banheiro imediatamente',
      '• Relaxe e aproveite o momento de intimidade',
      '',
      'PRIMEIROS 30 MINUTOS:',
      '• Evite duchas vaginais ou lavagens internas',
      '• Pode fazer higiene externa suave se necessário',
      '• Beba água para manter-se hidratada',
      '• Evite exercícios intensos',
      '',
      'PRIMEIRAS 2 HORAS:',
      '• Evite banhos muito quentes ou saunas',
      '• Não use absorventes internos',
      '• Mantenha atividades leves e relaxantes',
      '• Evite posições que forcem a gravidade contra o útero',
      '',
      'JUSTIFICATIVA CIENTÍFICA:',
      '• Os espermatozoides precisam de tempo para atravessar o colo do útero',
      '• A posição horizontal ajuda na migração espermática',
      '• O relaxamento reduz contrações uterinas que podem expulsar esperma',
      '• O ambiente vaginal precisa manter seu pH natural'
    ],
    tips: [
      'Não há necessidade de ficar horas deitada - 15 minutos são suficientes',
      'O orgasmo feminino pode ajudar na contração uterina que puxa os espermatozoides',
      'Evite estresse e ansiedade após a relação',
      'Mantenha uma rotina normal após o período inicial de repouso',
      'Lembre-se: milhões de espermatozoides são liberados, alguns sempre chegam ao destino'
    ]
  };

  const guides = [preRelationGuide, positionsGuide, postRelationGuide];

  const renderGuideDetail = () => {
    if (!selectedSection) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setSelectedSection(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedSection.title}</h1>
            <p className="text-gray-600">{selectedSection.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedSection.icon className="w-5 h-5" />
                  Guia Detalhado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedSection.content.map((item, index) => (
                    <div key={index} className="text-sm">
                      {item === '' ? (
                        <div className="h-4"></div>
                      ) : item.startsWith('•') ? (
                        <div className="flex items-start gap-2 ml-4">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item.substring(2)}</span>
                        </div>
                      ) : item.match(/^\d+\./) || item.includes(':') ? (
                        <h4 className="font-semibold text-gray-900 mt-4 mb-2">{item}</h4>
                      ) : (
                        <p className="text-gray-700">{item}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Dicas Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedSection.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Lembre-se
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800">
                  Cada casal é único. O mais importante é manter uma relação saudável, 
                  comunicativa e sem pressão. A concepção é um processo natural que 
                  pode levar tempo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pb-20 lg:pb-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Heart className="w-6 h-6 text-pink-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Guias de Relação Sexual
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {selectedSection ? (
            renderGuideDetail()
          ) : (
            <div className="space-y-6">
              {/* Overview */}
              <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    Guias para Otimizar a Concepção
                  </CardTitle>
                  <CardDescription className="text-pink-100">
                    Informações científicas e práticas para maximizar suas chances de engravidar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm opacity-90">Seções Completas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm opacity-90">Posições Recomendadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm opacity-90">Baseado em Ciência</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map((guide) => {
                  const IconComponent = guide.icon;
                  
                  return (
                    <Card key={guide.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-pink-600 transition-colors">
                              {guide.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {guide.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span>Conteúdo:</span>
                            <Badge variant="secondary">
                              {guide.content.filter(item => item.trim() !== '').length} itens
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span>Dicas:</span>
                            <Badge variant="outline">
                              {guide.tips.length} dicas
                            </Badge>
                          </div>
                          
                          <Button 
                            className="w-full mt-4 bg-pink-500 hover:bg-pink-600"
                            onClick={() => setSelectedSection(guide)}
                          >
                            Ver Guia Completo
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Important Notice */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Aviso Importante
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-800">
                    <strong>Consulte sempre seu médico:</strong> Estas informações são educativas e não substituem 
                    orientação médica profissional. Cada casal tem necessidades únicas, e um especialista 
                    em fertilidade pode oferecer orientações personalizadas para sua situação específica.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}