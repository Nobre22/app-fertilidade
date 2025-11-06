"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Play,
  Pause,
  RotateCcw,
  Heart,
  Zap,
  Shield,
  Target
} from 'lucide-react';

interface Protocol {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: 'feminino' | 'masculino' | 'detox' | 'nutricao';
  components: string[];
  benefits: string[];
  warnings: string[];
  instructions: string;
  progress?: number;
  isActive?: boolean;
}

export default function ProtocolsPage() {
  const { user } = useAuth();
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [activeTab, setActiveTab] = useState('feminino');

  const protocols: Protocol[] = [
    {
      id: 'protocolo-feminino-avancado',
      name: 'Protocolo Feminino Avançado',
      description: 'Fórmula única de fertilidade feminina completa para otimizar a concepção durante 12 semanas.',
      duration: '12 semanas',
      difficulty: 'Avançado',
      category: 'feminino',
      instructions: 'Tomar 3 cápsulas pela manhã, preferencialmente com o estômago vazio, acompanhadas de um copo de água.',
      components: [
        'Inositol mio-inositol - 660mg',
        'D-chiro-inositol - 16,5mg',
        'CoQ10 ubiquinol - 65mg',
        'Vitex agnus-castus (extrato seco 0,6% aucubina) - 130mg',
        'L-Arginina - 330mg',
        'Ácido fólico metilado (5-MTHF Quatrefolic) - 265mcg',
        'Metilcobalamina (B12) - 330mcg',
        'Piridoxal-5-fosfato (B6 ativa) - 10mg',
        'Vitamina E natural (d-alfa-tocoferol) - 130 UI',
        'Vitamina C (ascorbato de cálcio) - 165mg',
        'Zinco bisglicinato - 6,5mg',
        'Selênio (selenometionina) - 33mcg',
        'Magnésio bisglicinato - 65mg',
        'Ferro bisglicinato - 9mg',
        'Colecalciferol (Vitamina D3) - 665 UI',
        'Iodo (de kelp) - 50mcg',
        'Ômega-3 (EPA/DHA 40%) - 165mg',
        'NAC (N-Acetilcisteína) - 100mg',
        'Ácido alfa-lipóico - 65mg'
      ],
      benefits: [
        'Melhora qualidade dos óvulos significativamente',
        'Regula ciclos menstruais e ovulação',
        'Aumenta reserva ovariana',
        'Reduz inflamação sistêmica',
        'Melhora sensibilidade à insulina',
        'Fortalece sistema imunológico',
        'Otimiza função mitocondrial',
        'Aumenta chances de implantação'
      ],
      warnings: [
        'Acompanhamento médico obrigatório durante todo o protocolo',
        'Monitorar função tireoidiana devido ao iodo',
        'Ajustar doses conforme exames laboratoriais',
        'Não exceder a dosagem recomendada',
        'Informar médico sobre todos os componentes'
      ],
      progress: 65,
      isActive: true
    },
    {
      id: 'protocolo-masculino-avancado',
      name: 'Protocolo Masculino Avançado',
      description: 'Fórmula única de fertilidade masculina completa para otimizar a qualidade espermática durante 12 semanas.',
      duration: '12 semanas',
      difficulty: 'Avançado',
      category: 'masculino',
      instructions: 'Tomar 3 cápsulas pela manhã, preferencialmente com o estômago vazio, acompanhadas de um copo de água.',
      components: [
        'L-Carnitina L-tartarato - 500mg',
        'Acetil-L-Carnitina - 125mg',
        'CoQ10 ubiquinol - 50mg',
        'Tribulus terrestris (40% saponinas) - 185mg',
        'Maca peruana gelatinizada - 250mg',
        'Ashwagandha KSM-66 - 75mg',
        'NAC (N-Acetilcisteína) - 150mg',
        'Ácido alfa-lipóico - 75mg',
        'Ácido fólico metilado (5-MTHF) - 200mcg',
        'Metilcobalamina (B12) - 250mcg',
        'Piridoxal-5-fosfato (B6) - 10mg',
        'Vitamina C - 250mg',
        'Vitamina E natural (tocoferóis mistos) - 100 UI',
        'Zinco picolinato - 7,5mg',
        'Selênio (selenometionina) - 50mcg',
        'Vitamina D3 - 1250 UI',
        'Licopeno - 3,75mg',
        'Magnésio bisglicinato - 50mg',
        'Colina bitartrato - 125mg',
        'Betaína HCl - 100mg'
      ],
      benefits: [
        'Melhora concentração espermática',
        'Aumenta motilidade dos espermatozoides',
        'Reduz fragmentação do DNA espermático',
        'Melhora morfologia espermática',
        'Aumenta libido e função sexual',
        'Reduz estresse oxidativo',
        'Melhora função mitocondrial',
        'Otimiza produção de testosterona'
      ],
      warnings: [
        'Acompanhamento médico obrigatório durante todo o protocolo',
        'Monitorar função hepática devido aos extratos',
        'Não usar com medicamentos para pressão sem orientação',
        'Ajustar doses conforme exames laboratoriais',
        'Informar médico sobre todos os componentes'
      ],
      progress: 45,
      isActive: true
    },
    {
      id: 'detox-8-semanas',
      name: 'Protocolo Detox 8 Semanas',
      description: 'Programa de desintoxicação completo para preparar o corpo para a concepção.',
      duration: '8 semanas',
      difficulty: 'Intermediário',
      category: 'detox',
      instructions: 'Seguir o cronograma semanal com alimentação, suplementação e hábitos de vida saudáveis.',
      components: [
        'Semana 1-2: Eliminação de processados e açúcar',
        'Semana 3-4: Introdução de superalimentos',
        'Semana 5-6: Otimização da hidratação',
        'Semana 7-8: Consolidação dos hábitos'
      ],
      benefits: [
        'Remove toxinas que afetam hormônios',
        'Melhora função hepática',
        'Aumenta energia e vitalidade',
        'Prepara corpo para concepção',
        'Melhora qualidade do sono',
        'Reduz inflamação sistêmica'
      ],
      warnings: [
        'Não fazer durante tentativas ativas de concepção',
        'Aumentar hidratação gradualmente',
        'Monitorar sintomas de detox',
        'Consultar médico se tiver condições hepáticas'
      ],
      progress: 85,
      isActive: true
    }
  ];

  const getProtocolsByCategory = (category: string) => {
    return protocols.filter(protocol => protocol.category === category);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'feminino': return Heart;
      case 'masculino': return Zap;
      case 'detox': return Shield;
      default: return Target;
    }
  };

  const renderProtocolList = (category: string) => {
    const categoryProtocols = getProtocolsByCategory(category);
    
    return (
      <div className="space-y-4">
        {categoryProtocols.map((protocol) => {
          const IconComponent = getCategoryIcon(protocol.category);
          
          return (
            <Card key={protocol.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{protocol.name}</CardTitle>
                      <CardDescription className="mt-1">{protocol.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(protocol.difficulty)}>
                    {protocol.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span className="font-medium">{protocol.duration}</span>
                  </div>
                  
                  {protocol.isActive && protocol.progress !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso:</span>
                        <span>{protocol.progress}%</span>
                      </div>
                      <Progress value={protocol.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedProtocol(protocol)}
                    >
                      Ver Detalhes
                    </Button>
                    {protocol.isActive ? (
                      <Button size="sm" className="flex-1" variant="secondary">
                        <Pause className="w-4 h-4 mr-1" />
                        Pausar
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1">
                        <Play className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderProtocolDetail = () => {
    if (!selectedProtocol) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setSelectedProtocol(null)}>
            ← Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedProtocol.name}</h1>
            <p className="text-gray-600">{selectedProtocol.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instruções de Uso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{selectedProtocol.instructions}</p>
              </CardContent>
            </Card>

            {/* Components */}
            <Card>
              <CardHeader>
                <CardTitle>Composição por Cápsula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedProtocol.components.map((component, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{component}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Benefícios Esperados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProtocol.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Warnings */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avisos Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedProtocol.warnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-orange-800">{warning}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Informações do Protocolo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Duração</label>
                  <p className="font-semibold text-pink-600">{selectedProtocol.duration}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Dificuldade</label>
                  <Badge className={getDifficultyColor(selectedProtocol.difficulty)}>
                    {selectedProtocol.difficulty}
                  </Badge>
                </div>
                
                {selectedProtocol.isActive && selectedProtocol.progress !== undefined && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Progresso</label>
                    <Progress value={selectedProtocol.progress} className="mt-2" />
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedProtocol.progress}% completo
                    </p>
                  </div>
                )}
                
                <div className="space-y-2 pt-4">
                  {selectedProtocol.isActive ? (
                    <>
                      <Button variant="outline" className="w-full">
                        <Pause className="w-4 h-4 mr-2" />
                        Pausar Protocolo
                      </Button>
                      <Button variant="outline" className="w-full">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reiniciar
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full bg-pink-500 hover:bg-pink-600">
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Protocolo
                    </Button>
                  )}
                </div>
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
                <BookOpen className="w-6 h-6 text-pink-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Protocolos de Fertilidade
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {selectedProtocol ? (
            renderProtocolDetail()
          ) : (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-100 text-sm">Protocolos Ativos</p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                      <Play className="w-8 h-8 text-pink-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Progresso Médio</p>
                        <p className="text-2xl font-bold">65%</p>
                      </div>
                      <Target className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Tempo Restante</p>
                        <p className="text-2xl font-bold">7 sem</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Protocol Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="feminino">Feminino</TabsTrigger>
                  <TabsTrigger value="masculino">Masculino</TabsTrigger>
                  <TabsTrigger value="detox">Detox</TabsTrigger>
                </TabsList>
                
                <TabsContent value="feminino" className="mt-6">
                  {renderProtocolList('feminino')}
                </TabsContent>
                
                <TabsContent value="masculino" className="mt-6">
                  {renderProtocolList('masculino')}
                </TabsContent>
                
                <TabsContent value="detox" className="mt-6">
                  {renderProtocolList('detox')}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}