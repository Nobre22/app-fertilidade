"use client";

import { useState } from "react";
import { Heart, Users, Clock, Moon, Sun, Thermometer, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IntimacyGuide() {
  const [activeTab, setActiveTab] = useState("timing");

  const optimalTiming = {
    fertileDays: [
      { day: "5 dias antes", probability: "10%", description: "Início da janela fértil" },
      { day: "4 dias antes", probability: "16%", description: "Probabilidade baixa" },
      { day: "3 dias antes", probability: "14%", description: "Probabilidade moderada" },
      { day: "2 dias antes", probability: "27%", description: "Alta probabilidade" },
      { day: "1 dia antes", probability: "31%", description: "Pico de fertilidade" },
      { day: "Dia da ovulação", probability: "33%", description: "Máxima fertilidade" },
    ],
    recommendations: [
      "Mantenha relações a cada 1-2 dias durante a janela fértil",
      "Não é necessário ter relações todos os dias",
      "A qualidade é mais importante que a quantidade",
      "Evite estresse e pressão excessiva"
    ]
  };

  const preparations = [
    {
      category: "Preparação Física",
      icon: Thermometer,
      color: "bg-rose-100 text-rose-700",
      tips: [
        "Mantenha uma temperatura corporal adequada",
        "Evite banhos muito quentes antes da relação",
        "Hidrate-se bem ao longo do dia",
        "Pratique exercícios leves para melhorar a circulação"
      ]
    },
    {
      category: "Preparação Mental",
      icon: Heart,
      color: "bg-purple-100 text-purple-700",
      tips: [
        "Crie um ambiente relaxante e romântico",
        "Pratique técnicas de relaxamento",
        "Comunique-se abertamente com seu parceiro",
        "Foque no prazer, não apenas na concepção"
      ]
    },
    {
      category: "Preparação do Ambiente",
      icon: Moon,
      color: "bg-blue-100 text-blue-700",
      tips: [
        "Diminua as luzes ou use velas",
        "Mantenha o quarto em temperatura confortável",
        "Remova distrações (celulares, TV)",
        "Use música suave se desejarem"
      ]
    }
  ];

  const positions = [
    {
      name: "Papai e Mamãe",
      description: "Posição clássica face a face, favorece intimidade e penetração profunda",
      benefits: ["Penetração profunda", "Contato visual íntimo", "Controle do ritmo", "Facilita a concepção"],
      fertility: "Alta",
      difficulty: "Fácil"
    },
    {
      name: "Travesseiro Elevado",
      description: "Posição clássica com travesseiro sob os quadris da mulher para melhor ângulo",
      benefits: ["Ângulo otimizado", "Penetração mais profunda", "Facilita caminho dos espermatozoides", "Confortável"],
      fertility: "Muito Alta",
      difficulty: "Fácil"
    },
    {
      name: "Conchinha",
      description: "Ambos deitados de lado, homem por trás em posição aconchegante",
      benefits: ["Muito confortável", "Relaxante", "Boa para gravidez inicial", "Intimidade prolongada"],
      fertility: "Moderada",
      difficulty: "Fácil"
    },
    {
      name: "Amazona",
      description: "Mulher por cima controlando profundidade e ritmo da relação",
      benefits: ["Controle feminino", "Estimulação do clitóris", "Ângulo favorável", "Empoderamento"],
      fertility: "Moderada",
      difficulty: "Moderada"
    },
    {
      name: "Cachorrinho",
      description: "Mulher de quatro apoios, homem por trás - permite penetração muito profunda",
      benefits: ["Penetração muito profunda", "Estimulação do ponto G", "Ângulo ideal para concepção", "Intensidade"],
      fertility: "Muito Alta",
      difficulty: "Moderada"
    },
    {
      name: "Borboleta",
      description: "Mulher deitada na beira da cama com pernas elevadas, homem em pé",
      benefits: ["Penetração profunda", "Ângulo otimizado", "Facilita deposição seminal", "Variação estimulante"],
      fertility: "Alta",
      difficulty: "Moderada"
    }
  ];

  const aftercare = [
    {
      title: "Permaneça Deitada",
      description: "Fique deitada por 10-15 minutos após a relação",
      icon: Clock,
      color: "text-emerald-600"
    },
    {
      title: "Eleve os Quadris",
      description: "Use um travesseiro para elevar ligeiramente os quadris",
      icon: Sun,
      color: "text-amber-600"
    },
    {
      title: "Relaxe e Conecte-se",
      description: "Aproveite o momento íntimo com seu parceiro",
      icon: Heart,
      color: "text-rose-600"
    },
    {
      title: "Hidrate-se",
      description: "Beba água para manter-se hidratada",
      icon: Thermometer,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Guia de Intimidade</h2>
          <p className="text-gray-600">Maximize suas chances de concepção com orientações especializadas</p>
        </div>
      </div>

      {/* Fertility Window Alert */}
      <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">🌟 Janela Fértil Ativa</h3>
              <p className="text-pink-100">
                Os próximos 3 dias são ideais para concepção. Aproveite este momento especial!
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">33%</div>
              <div className="text-pink-100 text-sm">Chance de concepção hoje</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timing">Timing Ideal</TabsTrigger>
          <TabsTrigger value="preparation">Preparação</TabsTrigger>
          <TabsTrigger value="positions">Posições</TabsTrigger>
          <TabsTrigger value="aftercare">Pós-Relação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                <span>Probabilidade de Concepção por Dia</span>
              </CardTitle>
              <CardDescription>
                Baseado em estudos científicos sobre fertilidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {optimalTiming.fertileDays.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        parseFloat(day.probability) > 25 ? 'bg-rose-500' : 
                        parseFloat(day.probability) > 15 ? 'bg-pink-400' : 'bg-gray-400'
                      }`}>
                        {day.probability}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{day.day}</div>
                        <div className="text-sm text-gray-600">{day.description}</div>
                      </div>
                    </div>
                    <Badge variant={parseFloat(day.probability) > 25 ? "default" : "secondary"}>
                      {parseFloat(day.probability) > 25 ? "Ideal" : parseFloat(day.probability) > 15 ? "Bom" : "Baixo"}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-3">Recomendações Gerais</h4>
                <div className="space-y-2">
                  {optimalTiming.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <span className="text-sm text-emerald-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preparation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {preparations.map((prep, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${prep.color}`}>
                    <prep.icon className="w-5 h-5" />
                    <span>{prep.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prep.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="positions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {positions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-rose-700">{position.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant={position.fertility === "Muito Alta" ? "default" : position.fertility === "Alta" ? "secondary" : "outline"}>
                        {position.fertility}
                      </Badge>
                      <Badge variant="outline">{position.difficulty}</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">{position.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Benefícios para Fertilidade:</h4>
                    <div className="space-y-2">
                      {position.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Lembre-se</h4>
                  <p className="text-sm text-amber-700">
                    O mais importante é que ambos se sintam confortáveis e conectados. 
                    A posição perfeita é aquela que funciona para vocês como casal. 
                    Não se sintam pressionados a seguir regras rígidas - o prazer e a intimidade são fundamentais.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="aftercare" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aftercare.map((care, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <care.icon className={`w-6 h-6 ${care.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{care.title}</h4>
                      <p className="text-sm text-gray-600">{care.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span>Conexão Emocional</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  O período após a relação é uma oportunidade especial para fortalecer 
                  a conexão emocional com seu parceiro. Este momento de intimidade 
                  pode ser tão importante quanto o ato em si.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Conversem</h4>
                    <p className="text-sm text-purple-700">
                      Compartilhem sentimentos, sonhos sobre o futuro bebê, 
                      ou simplesmente aproveitem a proximidade.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-rose-50 rounded-lg">
                    <h4 className="font-medium text-rose-800 mb-2">Relaxem Juntos</h4>
                    <p className="text-sm text-rose-700">
                      Pratiquem respiração profunda, façam carícias suaves 
                      ou simplesmente desfrutem do silêncio confortável.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}