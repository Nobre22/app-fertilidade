"use client";

import { useState } from "react";
import { Heart, Zap, Target, User, Users, Clock, Star, Pill, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FertilityProtocol() {
  const [activeGender, setActiveGender] = useState<'female' | 'male'>('female');
  const [currentWeek, setCurrentWeek] = useState(2);

  const femaleProtocol = {
    duration: 12, // weeks (3 meses)
    currentWeek: currentWeek,
    title: "Protocolo de Fertilidade Feminina Avançada",
    description: "Fórmula All in One completa para otimizar sua fertilidade",
    allInOneFormula: {
      name: "Fórmula All in One Feminina",
      presentation: "90 cápsulas/mês",
      duration: "3 meses",
      posology: "3 cápsulas pela manhã",
      ingredients: [
        { name: "Inositol mio + D-chiro", amount: "2000mg + 50mg", purpose: "Regulação hormonal e qualidade ovariana" },
        { name: "CoQ10 ubiquinol", amount: "200mg", purpose: "Energia mitocondrial dos óvulos" },
        { name: "Vitex agnus-castus", amount: "400mg", purpose: "Equilíbrio hormonal natural" },
        { name: "L-Arginina", amount: "1000mg", purpose: "Fluxo sanguíneo uterino" },
        { name: "Ácido fólico metilado", amount: "800mcg", purpose: "Prevenção de defeitos do tubo neural" },
        { name: "Vitamina B12", amount: "1000mcg", purpose: "Síntese de DNA e divisão celular" },
        { name: "Vitamina B6", amount: "30mg", purpose: "Regulação hormonal" },
        { name: "Vitamina E", amount: "400 UI", purpose: "Proteção antioxidante" },
        { name: "Vitamina C", amount: "500mg", purpose: "Antioxidante e absorção de ferro" },
        { name: "Zinco", amount: "20mg", purpose: "Fertilidade e desenvolvimento fetal" },
        { name: "Selênio", amount: "100mcg", purpose: "Proteção antioxidante" },
        { name: "Magnésio", amount: "200mg", purpose: "Relaxamento muscular e nervoso" },
        { name: "Ferro bisglicinato", amount: "27mg", purpose: "Prevenção de anemia" },
        { name: "Vitamina D3", amount: "2000 UI", purpose: "Saúde hormonal e óssea" },
        { name: "Ômega-3", amount: "500mg", purpose: "Anti-inflamatório e desenvolvimento neural" }
      ]
    },
    phases: [
      {
        name: "Preparação Hormonal",
        weeks: "1-4",
        focus: "Regulação do ciclo e equilíbrio hormonal",
        color: "bg-rose-500"
      },
      {
        name: "Otimização Ovariana",
        weeks: "5-8",
        focus: "Melhoria da qualidade dos óvulos",
        color: "bg-pink-500"
      },
      {
        name: "Preparação Uterina",
        weeks: "9-12",
        focus: "Fortalecimento do endométrio",
        color: "bg-purple-500"
      }
    ],
    lifestyle: [
      { activity: "Yoga para fertilidade", frequency: "3x/semana", duration: "45min" },
      { activity: "Meditação mindfulness", frequency: "Diário", duration: "15min" },
      { activity: "Caminhada leve", frequency: "5x/semana", duration: "30min" },
      { activity: "Massagem abdominal", frequency: "3x/semana", duration: "10min" },
      { activity: "Banho de sol", frequency: "Diário", duration: "20min" },
    ],
    tracking: [
      "Temperatura basal corporal",
      "Muco cervical",
      "Posição do colo do útero",
      "Teste de ovulação (LH)",
      "Sintomas físicos e emocionais"
    ]
  };

  const maleProtocol = {
    duration: 12, // weeks (3 meses)
    currentWeek: currentWeek,
    title: "Protocolo de Fertilidade Masculina Avançada",
    description: "Fórmula All in One completa para maximizar a qualidade espermática",
    allInOneFormula: {
      name: "Fórmula All in One Masculina",
      presentation: "120 cápsulas/mês",
      duration: "3 meses",
      posology: "4 cápsulas pela manhã",
      ingredients: [
        { name: "L-Carnitina L-tartarato", amount: "2000mg", purpose: "Energia e mobilidade espermática" },
        { name: "CoQ10 ubiquinol", amount: "200mg", purpose: "Energia mitocondrial dos espermatozoides" },
        { name: "Tribulus terrestris", amount: "500mg", purpose: "Suporte natural de testosterona" },
        { name: "Maca peruana", amount: "750mg", purpose: "Libido e vitalidade reprodutiva" },
        { name: "Ashwagandha", amount: "300mg", purpose: "Redução do estresse e testosterona" },
        { name: "NAC", amount: "600mg", purpose: "Antioxidante e qualidade espermática" },
        { name: "Ácido alfa-lipóico", amount: "300mg", purpose: "Proteção antioxidante" },
        { name: "Ácido fólico metilado", amount: "800mcg", purpose: "Síntese de DNA espermático" },
        { name: "Vitamina B12", amount: "1000mcg", purpose: "Divisão celular e energia" },
        { name: "Vitamina C", amount: "1000mg", purpose: "Antioxidante e integridade do DNA" },
        { name: "Vitamina E", amount: "400 UI", purpose: "Proteção da membrana espermática" },
        { name: "Zinco", amount: "30mg", purpose: "Produção e qualidade espermática" },
        { name: "Selênio", amount: "200mcg", purpose: "Motilidade espermática" },
        { name: "Vitamina D3", amount: "5000 UI", purpose: "Saúde hormonal e testosterona" }
      ]
    },
    phases: [
      {
        name: "Desintoxicação",
        weeks: "1-4",
        focus: "Eliminação de toxinas e radicais livres",
        color: "bg-blue-500"
      },
      {
        name: "Otimização Espermática",
        weeks: "5-8",
        focus: "Melhoria da qualidade do esperma",
        color: "bg-indigo-500"
      },
      {
        name: "Maximização da Fertilidade",
        weeks: "9-12",
        focus: "Pico da capacidade reprodutiva",
        color: "bg-purple-500"
      }
    ],
    lifestyle: [
      { activity: "Exercício de força", frequency: "3x/semana", duration: "60min" },
      { activity: "Cardio moderado", frequency: "2x/semana", duration: "30min" },
      { activity: "Sauna/banho frio", frequency: "2x/semana", duration: "20min" },
      { activity: "Técnicas de respiração", frequency: "Diário", duration: "10min" },
      { activity: "Sono reparador", frequency: "Diário", duration: "7-8h" },
    ],
    tracking: [
      "Análise seminal (espermograma)",
      "Níveis de testosterona",
      "Qualidade do sono",
      "Níveis de estresse",
      "Função erétil e libido"
    ]
  };

  const currentProtocol = activeGender === 'female' ? femaleProtocol : maleProtocol;
  const progress = (currentProtocol.currentWeek / currentProtocol.duration) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Protocolo de Fertilidade Avançada</h2>
          <p className="text-gray-600">Maximize suas chances de concepção</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={activeGender === 'female' ? 'default' : 'outline'}
            onClick={() => setActiveGender('female')}
            className={activeGender === 'female' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            size="sm"
          >
            <User className="w-4 h-4 mr-2" />
            Mulher
          </Button>
          <Button
            variant={activeGender === 'male' ? 'default' : 'outline'}
            onClick={() => setActiveGender('male')}
            className={activeGender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            size="sm"
          >
            <Users className="w-4 h-4 mr-2" />
            Homem
          </Button>
        </div>
      </div>

      {/* Protocol Overview */}
      <Card className={`bg-gradient-to-r ${activeGender === 'female' ? 'from-rose-500 to-pink-500' : 'from-blue-500 to-indigo-500'} text-white`}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">{currentProtocol.title}</h3>
              <p className="text-white/80 mt-2 text-sm sm:text-base">{currentProtocol.description}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold">Semana {currentProtocol.currentWeek}</div>
              <div className="text-white/80 text-sm">de {currentProtocol.duration} semanas</div>
            </div>
          </div>
          
          <Progress value={progress} className="h-3 bg-white/20 mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentProtocol.phases.map((phase, index) => (
              <div key={index} className="text-center">
                <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                  currentWeek >= (index * 4 + 1) ? 'bg-white' : 'bg-white/30'
                }`}></div>
                <div className="text-sm font-medium">{phase.name}</div>
                <div className="text-xs text-white/70">Semanas {phase.weeks}</div>
                <div className="text-xs text-white/60 mt-1">{phase.focus}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All in One Formula Card */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-emerald-800">
            <Pill className="w-6 h-6 text-emerald-600" />
            <span>{currentProtocol.allInOneFormula.name}</span>
            <Badge className="bg-emerald-600 text-white">FÓRMULA COMPLETA</Badge>
          </CardTitle>
          <CardDescription className="text-emerald-700">
            Todos os nutrientes essenciais em uma única fórmula otimizada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2 p-3 bg-white/60 rounded-lg">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="font-semibold text-emerald-800">Duração</div>
                <div className="text-sm text-emerald-700">{currentProtocol.allInOneFormula.duration}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-white/60 rounded-lg">
              <Pill className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="font-semibold text-emerald-800">Apresentação</div>
                <div className="text-sm text-emerald-700">{currentProtocol.allInOneFormula.presentation}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-white/60 rounded-lg">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="font-semibold text-emerald-800">Posologia</div>
                <div className="text-sm text-emerald-700">{currentProtocol.allInOneFormula.posology}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-emerald-800 text-lg mb-4">Composição Completa:</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {currentProtocol.allInOneFormula.ingredients.map((ingredient, index) => (
                <div key={index} className="p-3 bg-white/80 rounded-lg border border-emerald-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <span className="font-medium text-emerald-800">{ingredient.name}</span>
                    <span className="text-emerald-600 font-semibold text-sm">{ingredient.amount}</span>
                  </div>
                  <p className="text-xs text-emerald-700">{ingredient.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-amber-800">Vantagens da Fórmula All in One</h4>
            </div>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• <strong>Praticidade:</strong> Todos os nutrientes em uma única fórmula</li>
              <li>• <strong>Sinergia:</strong> Ingredientes que potencializam uns aos outros</li>
              <li>• <strong>Dosagens otimizadas:</strong> Baseadas em evidências científicas</li>
              <li>• <strong>Economia:</strong> Mais econômico que suplementos individuais</li>
              <li>• <strong>Compliance:</strong> Maior adesão ao tratamento</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Protocol Details */}
      <Tabs defaultValue="lifestyle" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lifestyle">Estilo de Vida</TabsTrigger>
          <TabsTrigger value="tracking">Monitoramento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lifestyle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Mudanças no Estilo de Vida</span>
              </CardTitle>
              <CardDescription>
                Atividades essenciais para maximizar sua fertilidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProtocol.lifestyle.map((item, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">{item.activity}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-blue-600 gap-1">
                      <span>Frequência: {item.frequency}</span>
                      <span>Duração: {item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span>Monitoramento e Exames</span>
              </CardTitle>
              <CardDescription>
                Acompanhe indicadores importantes da sua fertilidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentProtocol.tracking.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-purple-800 font-medium text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Cronograma de Exames</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>• <strong>Semana 1:</strong> Exames hormonais basais</p>
                  <p>• <strong>Semana 4:</strong> Avaliação de progresso</p>
                  <p>• <strong>Semana 8:</strong> Exames de controle</p>
                  <p>• <strong>Semana 12:</strong> Avaliação final</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Semanal</CardTitle>
          <CardDescription>
            Acompanhe sua evolução ao longo do protocolo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
              <div key={week} className={`p-2 rounded-lg text-center text-sm ${
                week < currentWeek 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : week === currentWeek
                  ? 'bg-rose-100 text-rose-700 border-2 border-rose-400'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                <div className="font-medium">S{week}</div>
                {week < currentWeek && <div className="text-xs">✓</div>}
                {week === currentWeek && <div className="text-xs">●</div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}