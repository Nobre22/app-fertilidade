"use client";

import { useState, useEffect } from "react";
import { Heart, Calendar, TrendingUp, Droplets, Sun, Moon, Baby, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [currentDay, setCurrentDay] = useState(14);
  const [cyclePhase, setCyclePhase] = useState("Ovulação");
  const [fertilityScore, setFertilityScore] = useState(85);

  // Simular dados do ciclo
  const cycleData = {
    totalDays: 28,
    currentDay: currentDay,
    phase: cyclePhase,
    nextPeriod: 14,
    ovulationWindow: [12, 13, 14, 15, 16],
    temperature: 36.8,
    mood: "Energizada"
  };

  const todayTasks = [
    { id: 1, task: "Tomar vitamina D", completed: true, type: "supplement" },
    { id: 2, task: "Beber 2L de água", completed: false, type: "hydration" },
    { id: 3, task: "Exercício leve (30min)", completed: true, type: "exercise" },
    { id: 4, task: "Meditar (10min)", completed: false, type: "wellness" },
    { id: 5, task: "Registrar temperatura", completed: true, type: "tracking" }
  ];

  const completedTasks = todayTasks.filter(task => task.completed).length;
  const taskProgress = (completedTasks / todayTasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Olá, Ana & João! 👋</h2>
            <p className="text-rose-100 mb-4">
              Hoje é um ótimo dia para cuidar da sua fertilidade
            </p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30">
                <Calendar className="w-3 h-3 mr-1" />
                Ciclo Dia {cycleData.currentDay}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Heart className="w-3 h-3 mr-1" />
                {cycleData.phase}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{fertilityScore}%</div>
            <div className="text-rose-100 text-sm">Score de Fertilidade</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Próxima Ovulação</p>
                <p className="text-2xl font-bold text-emerald-700">2 dias</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Droplets className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-600 text-sm font-medium">Temperatura</p>
                <p className="text-2xl font-bold text-rose-700">{cycleData.temperature}°C</p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Protocolo Detox</p>
                <p className="text-2xl font-bold text-orange-700">Dia 7</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Humor</p>
                <p className="text-lg font-bold text-purple-700">{cycleData.mood}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Baby className="w-5 h-5 text-rose-500" />
            <span>Tarefas de Hoje</span>
          </CardTitle>
          <CardDescription>
            Complete suas atividades diárias para otimizar sua fertilidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso do Dia</span>
              <span className="text-sm text-gray-500">{completedTasks}/{todayTasks.length}</span>
            </div>
            <Progress value={taskProgress} className="h-2" />
          </div>

          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed 
                    ? 'bg-emerald-500 border-emerald-500' 
                    : 'border-gray-300'
                }`}>
                  {task.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {task.task}
                </span>
                <Badge variant={task.completed ? "default" : "secondary"} className="text-xs">
                  {task.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fertility Window */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-rose-700">
            <Heart className="w-5 h-5" />
            <span>Janela Fértil</span>
          </CardTitle>
          <CardDescription className="text-rose-600">
            Seus dias mais férteis este mês
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  cycleData.ovulationWindow.includes(day)
                    ? 'bg-rose-500 text-white shadow-lg'
                    : day === cycleData.currentDay
                    ? 'bg-rose-200 text-rose-700 ring-2 ring-rose-400'
                    : 'bg-white text-gray-600 hover:bg-rose-100'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-rose-600">
              <strong>Dica:</strong> Os próximos 3 dias são ideais para concepção
            </div>
            <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
              Ver Dicas de Intimidade
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}