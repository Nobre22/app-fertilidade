"use client";

import { useState } from "react";
import { Leaf, Droplets, Apple, Clock, CheckCircle, User, Users, Pill, Calendar, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DetoxProtocol() {
  const [activeGender, setActiveGender] = useState<'female' | 'male'>('female');
  const [currentWeek, setCurrentWeek] = useState(2);

  const femaleProtocol = {
    duration: 12,
    currentWeek: currentWeek,
    phases: [
      {
        name: "PREPARAÇÃO",
        weeks: "1-4",
        focus: "Preparar o organismo para desintoxicação profunda, ativar vias de eliminação",
        color: "bg-emerald-500"
      },
      {
        name: "LIMPEZA PROFUNDA",
        weeks: "5-8",
        focus: "Eliminação de xenoestrogênios, metais pesados e toxinas acumuladas",
        color: "bg-teal-500"
      },
      {
        name: "REGENERAÇÃO",
        weeks: "9-12",
        focus: "Restaurar função mitocondrial, regenerar tecidos, otimizar metabolismo",
        color: "bg-green-500"
      }
    ],
    formulas: {
      phase1: [
        {
          name: "FÓRMULA 1A - Cápsula Detox Hepática Feminina",
          ingredients: [
            "N-Acetilcisteína (NAC) - 600mg",
            "Ácido Alfa-Lipóico - 300mg",
            "Silimarina (80% silibilina) - 200mg",
            "Colina bitartrato - 250mg",
            "Vitamina B6 (piridoxal-5-fosfato) - 25mg"
          ],
          posology: "1 cápsula 2x/dia (manhã e noite), antes das refeições",
          presentation: "60 cápsulas",
          note: "Excipiente: Celulose microcristalina q.s.p."
        },
        {
          name: "FÓRMULA 1B - Complexo Antioxidante Feminino",
          ingredients: [
            "Resveratrol micronizado - 200mg",
            "CoQ10 ubiquinol - 100mg",
            "Vitamina E (tocoferóis mistos) - 400 UI",
            "Selênio quelado - 200mcg",
            "Zinco quelado - 15mg"
          ],
          posology: "1 cápsula pela manhã com alimento gorduroso",
          presentation: "30 cápsulas",
          note: "Cápsula gastroprotegida para melhor absorção"
        },
        {
          name: "FÓRMULA 1C - Solução Detox Intestinal",
          ingredients: [
            "Psyllium husk em pó - 5g",
            "Glutamina - 3g",
            "Inulina FOS - 3g",
            "Probióticos (50 bilhões UFC) - mix de Lactobacillus e Bifidobacterium",
            "Magnésio bisglicinato - 300mg"
          ],
          posology: "Dissolver 1 sachê em 300ml de água, tomar à noite antes de dormir",
          presentation: "30 sachês",
          note: "Sabor: Laranja natural (opcional)"
        }
      ],
      phase2: [
        {
          name: "FÓRMULA 2A - Quelação Celular Feminina",
          ingredients: [
            "Ácido alfa-lipóico - 400mg",
            "Glutationa reduzida lipossomal - 250mg",
            "Ácido málico - 800mg",
            "Clorela (parede celular quebrada) - 500mg",
            "Cilantro extrato 10:1 - 200mg",
            "Vitamina C (ascorbato de cálcio) - 500mg"
          ],
          posology: "2 cápsulas 2x/dia (manhã e tarde), longe das refeições",
          presentation: "120 cápsulas",
          note: "Cápsula vegetal HPMC"
        },
        {
          name: "FÓRMULA 2B - Modulador Estrogênico Detox",
          ingredients: [
            "DIM (Diindolilmetano) - 200mg",
            "Indol-3-Carbinol - 200mg",
            "Cálcio-D-Glucarato - 500mg",
            "Extrato de brócolis (sulforafano) - 100mg",
            "Chá verde descafeinado (EGCG 95%) - 300mg"
          ],
          posology: "1 cápsula 2x/dia (manhã e tarde)",
          presentation: "60 cápsulas",
          note: "Auxilia eliminação de estrogênios sintéticos"
        },
        {
          name: "FÓRMULA 2C - Suporte Hepático Fase II",
          ingredients: [
            "Glicina - 1000mg",
            "Taurina - 500mg",
            "L-Metionina - 250mg",
            "Molibdênio quelado - 150mcg",
            "Vitaminas do complexo B ativadas - mix completo"
          ],
          posology: "2 cápsulas ao deitar",
          presentation: "60 cápsulas",
          note: ""
        }
      ],
      phase3: [
        {
          name: "FÓRMULA 3A - Regeneração Mitocondrial Feminina",
          ingredients: [
            "PQQ (Pirroloquinolina quinona) - 20mg",
            "CoQ10 ubiquinol - 200mg",
            "Nicotinamida ribosídeo - 150mg",
            "L-Carnitina L-tartarato - 1000mg",
            "Ácido R-alfa-lipóico - 300mg",
            "Resveratrol trans-micronizado - 250mg"
          ],
          posology: "2 cápsulas pela manhã com alimento",
          presentation: "60 cápsulas",
          note: "Tecnologia: Liberação gastrorresistente"
        },
        {
          name: "FÓRMULA 3B - Modulação Hormonal Natural",
          ingredients: [
            "Vitex agnus-castus (0,6% aucubina) - 400mg",
            "Maca peruana gelatinizada - 750mg",
            "Rhodiola rosea (3% rosavinas) - 300mg",
            "Ashwagandha KSM-66 - 300mg",
            "Magnésio treonato - 200mg"
          ],
          posology: "2 cápsulas pela manhã em jejum",
          presentation: "60 cápsulas",
          note: ""
        },
        {
          name: "FÓRMULA 3C - Reparação Celular Avançada",
          ingredients: [
            "Colágeno tipo I hidrolisado - 2500mg",
            "Ácido hialurônico de baixo peso molecular - 100mg",
            "Vitamina C lipossomal - 500mg",
            "Silício orgânico - 50mg",
            "Biotina - 5mg",
            "Zinco quelado - 20mg"
          ],
          posology: "1 sachê dissolvido em água, pela manhã",
          presentation: "30 sachês",
          note: "Sabor: Frutas vermelhas"
        }
      ]
    }
  };

  const maleProtocol = {
    duration: 12,
    currentWeek: currentWeek,
    phases: [
      {
        name: "DESINTOXICAÇÃO",
        weeks: "1-4",
        focus: "Limpeza hepática e eliminação de xenoestrógenos ambientais",
        color: "bg-blue-500"
      },
      {
        name: "OTIMIZAÇÃO",
        weeks: "5-8",
        focus: "Otimizar função testicular e qualidade seminal",
        color: "bg-indigo-500"
      },
      {
        name: "FORTALECIMENTO",
        weeks: "9-12",
        focus: "Maximizar vitalidade, força e resistência espermática",
        color: "bg-purple-500"
      }
    ],
    formulas: {
      phase1: [
        {
          name: "FÓRMULA 1A - Detox Hepático Masculino",
          ingredients: [
            "N-Acetilcisteína - 800mg",
            "Ácido alfa-lipóico - 400mg",
            "Cardo mariano (silimarina 80%) - 300mg",
            "Alcachofra extrato seco - 300mg",
            "Curcumina BCM-95 (alta biodisponibilidade) - 500mg",
            "Piperina - 5mg"
          ],
          posology: "2 cápsulas 2x/dia antes das principais refeições",
          presentation: "120 cápsulas",
          note: ""
        },
        {
          name: "FÓRMULA 1B - Eliminador de Xenoestrógenos",
          ingredients: [
            "DIM (Diindolilmetano) - 300mg",
            "Cálcio-D-Glucarato - 500mg",
            "Indol-3-Carbinol - 300mg",
            "Chá verde (EGCG) - 400mg",
            "Resveratrol - 200mg",
            "Zinco quelado - 25mg"
          ],
          posology: "2 cápsulas pela manhã",
          presentation: "60 cápsulas",
          note: "Reduz aromatização de testosterona em estrogênio"
        },
        {
          name: "FÓRMULA 1C - Limpeza Intestinal Profunda",
          ingredients: [
            "Psyllium husk - 6g",
            "L-Glutamina - 5g",
            "Probióticos masculinos específicos - 100 bilhões UFC",
            "Enzimas digestivas completas - 200mg",
            "Magnésio bisglicinato - 400mg",
            "Zinco carnosina - 75mg"
          ],
          posology: "1 sachê à noite em 300ml água",
          presentation: "30 sachês",
          note: ""
        }
      ],
      phase2: [
        {
          name: "FÓRMULA 2A - Suporte Testicular Premium",
          ingredients: [
            "L-Carnitina L-tartarato - 2000mg",
            "Acetil-L-Carnitina - 1000mg",
            "CoQ10 ubiquinol - 200mg",
            "Vitamina E (tocoferóis mistos) - 400 UI",
            "Selênio (selenometionina) - 200mcg",
            "Licopeno - 15mg"
          ],
          posology: "3 cápsulas pela manhã com alimento",
          presentation: "90 cápsulas",
          note: "Essencial para espermatogênese"
        },
        {
          name: "FÓRMULA 2B - Modulador Hormonal Masculino",
          ingredients: [
            "Tribulus terrestris (40% saponinas) - 750mg",
            "Tongkat Ali (Eurycoma longifolia) 100:1 - 200mg",
            "Fenugreek (50% fenuside) - 600mg",
            "Shilajit purificado (50% ácido fúlvico) - 250mg",
            "Boro quelado - 10mg",
            "Vitamina D3 - 5000 UI"
          ],
          posology: "2 cápsulas pela manhã em jejum",
          presentation: "60 cápsulas",
          note: "Suporte natural de testosterona"
        },
        {
          name: "FÓRMULA 2C - Proteção DNA Espermático",
          ingredients: [
            "Glutationa lipossomal - 500mg",
            "Ácido alfa-lipóico - 600mg",
            "Vitamina C lipossomal - 1000mg",
            "Zinco picolinato - 30mg",
            "Vitamina E natural - 400 UI",
            "Astaxantina - 12mg"
          ],
          posology: "2 cápsulas 2x/dia",
          presentation: "120 cápsulas",
          note: "Proteção contra fragmentação do DNA espermático"
        }
      ],
      phase3: [
        {
          name: "FÓRMULA 3A - Energia Mitocondrial Espermática",
          ingredients: [
            "PQQ - 20mg",
            "CoQ10 ubiquinol - 300mg",
            "NADH - 10mg",
            "Nicotinamida ribosídeo - 200mg",
            "Creatina monohidratada - 3000mg",
            "D-Ribose - 1000mg"
          ],
          posology: "1 sachê pela manhã em 200ml água",
          presentation: "30 sachês",
          note: ""
        },
        {
          name: "FÓRMULA 3B - Vitalidade Reprodutiva Máxima",
          ingredients: [
            "Maca negra peruana - 1500mg",
            "Ashwagandha KSM-66 - 600mg",
            "Panax ginseng (20% ginsenosídeos) - 400mg",
            "Rhodiola rosea - 300mg",
            "Mucuna pruriens (15% L-DOPA) - 300mg",
            "Cordyceps sinensis - 500mg"
          ],
          posology: "3 cápsulas pela manhã",
          presentation: "90 cápsulas",
          note: "Aumenta libido, energia e performance"
        },
        {
          name: "FÓRMULA 3C - Fortificação Estrutural",
          ingredients: [
            "Arginina AKG - 3000mg",
            "Citrulina malato - 2000mg",
            "Taurina - 1000mg",
            "Zinco quelado - 30mg",
            "Magnésio bisglicinato - 400mg",
            "Vitaminas do complexo B ativadas"
          ],
          posology: "2 cápsulas 2x/dia",
          presentation: "120 cápsulas",
          note: "Melhora fluxo sanguíneo e função erétil"
        }
      ]
    }
  };

  const currentProtocol = activeGender === 'female' ? femaleProtocol : maleProtocol;
  const progress = (currentProtocol.currentWeek / currentProtocol.duration) * 100;
  
  const getCurrentPhase = () => {
    if (currentWeek <= 4) return 0;
    if (currentWeek <= 8) return 1;
    return 2;
  };

  const getCurrentFormulas = () => {
    const phase = getCurrentPhase();
    if (phase === 0) return currentProtocol.formulas.phase1;
    if (phase === 1) return currentProtocol.formulas.phase2;
    return currentProtocol.formulas.phase3;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Protocolo Detox</h2>
          <p className="text-sm sm:text-base text-gray-600">Protocolo completo de 12 semanas para fertilidade</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={activeGender === 'female' ? 'default' : 'outline'}
            onClick={() => setActiveGender('female')}
            className={`flex-1 sm:flex-none ${activeGender === 'female' ? 'bg-rose-500 hover:bg-rose-600' : ''}`}
          >
            <User className="w-4 h-4 mr-2" />
            Mulher
          </Button>
          <Button
            variant={activeGender === 'male' ? 'default' : 'outline'}
            onClick={() => setActiveGender('male')}
            className={`flex-1 sm:flex-none ${activeGender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
          >
            <Users className="w-4 h-4 mr-2" />
            Homem
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className={`bg-gradient-to-r ${activeGender === 'female' ? 'from-emerald-500 to-teal-500' : 'from-blue-500 to-indigo-500'} text-white`}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Semana {currentProtocol.currentWeek} de {currentProtocol.duration}</h3>
              <p className="text-white/80 text-sm sm:text-base">Protocolo Detox {activeGender === 'female' ? 'Feminino' : 'Masculino'}</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold">{Math.round(progress)}%</div>
              <div className="text-white/80 text-xs sm:text-sm">Concluído</div>
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-white/20 mb-4 sm:mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {currentProtocol.phases.map((phase, index) => (
              <div key={index} className="text-center">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  getCurrentPhase() >= index ? 'bg-white' : 'bg-white/30'
                }`}></div>
                <div className="text-sm font-medium">{phase.name}</div>
                <div className="text-xs text-white/70">Semanas {phase.weeks}</div>
                <div className="text-xs text-white/60 mt-1">{phase.focus}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Details */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            <span>Fase Atual: {currentProtocol.phases[getCurrentPhase()].name}</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {currentProtocol.phases[getCurrentPhase()].focus}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Formulas */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span>Fórmulas da Fase Atual</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Suplementos manipulados específicos para esta fase do protocolo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            {getCurrentFormulas().map((formula, index) => (
              <div key={index} className="p-4 sm:p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <h4 className="font-bold text-blue-800 text-sm sm:text-base mb-3">{formula.name}</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-semibold text-blue-700 text-xs sm:text-sm mb-2">Composição:</h5>
                    <div className="space-y-1">
                      {formula.ingredients.map((ingredient, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-blue-600">{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-blue-700 text-xs sm:text-sm mb-1">Posologia:</h5>
                      <p className="text-xs sm:text-sm text-blue-600">{formula.posology}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-blue-700 text-xs sm:text-sm mb-1">Apresentação:</h5>
                      <p className="text-xs sm:text-sm text-blue-600">{formula.presentation}</p>
                    </div>
                    
                    {formula.note && (
                      <div>
                        <h5 className="font-semibold text-blue-700 text-xs sm:text-sm mb-1">Observação:</h5>
                        <p className="text-xs sm:text-sm text-blue-600">{formula.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Week Navigation */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            <span>Navegação por Semanas</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Selecione uma semana para ver as fórmulas específicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
              <Button
                key={week}
                variant={week === currentWeek ? 'default' : 'outline'}
                onClick={() => setCurrentWeek(week)}
                className={`text-xs sm:text-sm ${
                  week === currentWeek 
                    ? activeGender === 'female' 
                      ? 'bg-rose-500 hover:bg-rose-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                    : ''
                }`}
              >
                {week}
              </Button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">
              <strong>Semana {currentWeek}:</strong> {currentProtocol.phases[getCurrentPhase()].name} - {currentProtocol.phases[getCurrentPhase()].focus}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}