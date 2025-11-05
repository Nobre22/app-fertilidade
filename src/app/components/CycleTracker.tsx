"use client";

import { useState } from "react";
import { Calendar, Heart, Droplets, TrendingUp, Plus, Edit3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CycleTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [mood, setMood] = useState("");

  // Dados simulados do ciclo
  const cycleData = {
    currentCycle: 14,
    averageCycle: 28,
    lastPeriod: new Date(2024, 0, 15),
    nextPeriod: new Date(2024, 1, 12),
    ovulationDate: new Date(2024, 1, 1),
    fertileDays: [
      new Date(2024, 0, 28),
      new Date(2024, 0, 29),
      new Date(2024, 0, 30),
      new Date(2024, 0, 31),
      new Date(2024, 1, 1),
      new Date(2024, 1, 2),
    ]
  };

  const symptomsList = [
    "Cólicas leves",
    "Sensibilidade nos seios",
    "Mudança no muco cervical",
    "Aumento da libido",
    "Dor de ovulação",
    "Inchaço",
    "Acne",
    "Mudanças de humor"
  ];

  const moods = [
    { emoji: "😊", label: "Feliz" },
    { emoji: "😌", label: "Calma" },
    { emoji: "😴", label: "Cansada" },
    { emoji: "😤", label: "Irritada" },
    { emoji: "😢", label: "Triste" },
    { emoji: "🥰", label: "Amorosa" },
    { emoji: "💪", label: "Energizada" },
    { emoji: "🤒", label: "Indisposta" }
  ];

  const getCurrentPhase = () => {
    const day = cycleData.currentCycle;
    if (day >= 1 && day <= 5) return { phase: "Menstruação", color: "bg-red-500", description: "Período menstrual" };
    if (day >= 6 && day <= 13) return { phase: "Folicular", color: "bg-green-500", description: "Preparação para ovulação" };
    if (day >= 14 && day <= 16) return { phase: "Ovulação", color: "bg-pink-500", description: "Janela fértil" };
    return { phase: "Lútea", color: "bg-purple-500", description: "Pós-ovulação" };
  };

  const currentPhase = getCurrentPhase();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Tracker do Ciclo</h2>
          <p className="text-sm sm:text-base text-gray-600">Acompanhe seu ciclo menstrual e fertilidade</p>
        </div>
        <Button 
          onClick={() => setShowAddEntry(!showAddEntry)}
          className="bg-rose-500 hover:bg-rose-600 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Registro
        </Button>
      </div>

      {/* Current Cycle Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`w-3 h-3 rounded-full ${currentPhase.color}`}></div>
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{currentPhase.phase}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">{currentPhase.description}</p>
            <div className="text-xl sm:text-2xl font-bold text-rose-600">Dia {cycleData.currentCycle}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              <Badge className="bg-emerald-100 text-emerald-700 text-xs">Próxima</Badge>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Ovulação</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Previsão baseada no ciclo</p>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600">Em 2 dias</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <Badge className="bg-purple-100 text-purple-700 text-xs">Próxima</Badge>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Menstruação</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Baseado no ciclo médio</p>
            <div className="text-xl sm:text-2xl font-bold text-purple-600">Em 14 dias</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Entry Form */}
      {showAddEntry && (
        <Card className="border-rose-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-rose-700 text-base sm:text-lg">Novo Registro</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Adicione informações sobre hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="temperature" className="text-sm">Temperatura Basal (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="36.5"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Como você se sente hoje?</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {moods.map((moodOption) => (
                    <Button
                      key={moodOption.label}
                      variant={mood === moodOption.label ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMood(moodOption.label)}
                      className="h-12 p-1"
                    >
                      <div className="text-center">
                        <div className="text-base sm:text-lg">{moodOption.emoji}</div>
                        <div className="text-[10px] sm:text-xs leading-tight">{moodOption.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm">Sintomas (selecione os que se aplicam)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                {symptomsList.map((symptom) => (
                  <Button
                    key={symptom}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-2 px-3 text-left justify-start"
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Adicione qualquer observação sobre hoje..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button className="bg-rose-500 hover:bg-rose-600 w-full sm:w-auto">
                Salvar Registro
              </Button>
              <Button variant="outline" onClick={() => setShowAddEntry(false)} className="w-full sm:w-auto">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar View */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            <span>Calendário do Ciclo</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Visualize seu ciclo menstrual e janelas férteis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(2024, 0, i - 6);
              const day = date.getDate();
              const isCurrentMonth = date.getMonth() === 0;
              const isToday = date.toDateString() === new Date().toDateString();
              const isFertile = cycleData.fertileDays.some(d => d.toDateString() === date.toDateString());
              const isPeriod = day >= 15 && day <= 19;
              const isOvulation = day === 1;

              return (
                <button
                  key={i}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    !isCurrentMonth
                      ? 'text-gray-300'
                      : isOvulation
                      ? 'bg-pink-500 text-white shadow-lg'
                      : isFertile
                      ? 'bg-pink-100 text-pink-700 border-2 border-pink-300'
                      : isPeriod
                      ? 'bg-red-100 text-red-700'
                      : isToday
                      ? 'bg-rose-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 rounded-full"></div>
              <span>Menstruação</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-100 border-2 border-pink-300 rounded-full"></div>
              <span>Janela Fértil</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-500 rounded-full"></div>
              <span>Ovulação</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-rose-500 rounded-full"></div>
              <span>Hoje</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            <span>Registros Recentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {[
              { date: "Hoje", temp: "36.8°C", mood: "😊 Feliz", symptoms: ["Aumento da libido"] },
              { date: "Ontem", temp: "36.6°C", mood: "😌 Calma", symptoms: ["Mudança no muco cervical"] },
              { date: "2 dias atrás", temp: "36.5°C", mood: "💪 Energizada", symptoms: ["Sensibilidade nos seios"] },
            ].map((entry, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <div className="text-sm font-medium text-gray-700">{entry.date}</div>
                  <div className="text-sm text-gray-600">{entry.temp}</div>
                  <div className="text-sm">{entry.mood}</div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-2">
                  <div className="flex flex-wrap gap-1">
                    {entry.symptoms.map((symptom, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="ghost" className="flex-shrink-0">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}