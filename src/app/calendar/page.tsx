"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Heart,
  Droplets,
  Thermometer,
  NotebookPen
} from 'lucide-react';

interface CycleDay {
  date: Date;
  type?: 'menstruation' | 'fertile' | 'ovulation';
  temperature?: number;
  symptoms?: string[];
  notes?: string;
}

export default function CalendarPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [cycleData, setCycleData] = useState<{ [key: string]: CycleDay }>({});
  
  // Form states
  const [temperature, setTemperature] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [flowIntensity, setFlowIntensity] = useState('');

  const symptomOptions = [
    'Cólicas', 'Dor de cabeça', 'Inchaço', 'Sensibilidade nos seios',
    'Mudanças de humor', 'Fadiga', 'Náusea', 'Dor nas costas',
    'Acne', 'Constipação', 'Diarreia', 'Insônia'
  ];

  // Calcular janela fértil (exemplo: ciclo de 28 dias, ovulação no dia 14)
  const calculateFertileWindow = (startDate: Date) => {
    const fertile = [];
    for (let i = 10; i <= 16; i++) {
      const fertileDate = new Date(startDate);
      fertileDate.setDate(startDate.getDate() + i);
      fertile.push(fertileDate);
    }
    return fertile;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Dias do mês anterior para completar a primeira semana
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      days.push({ date: currentDay, isCurrentMonth: true });
    }
    
    // Dias do próximo mês para completar a última semana
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayType = (date: Date) => {
    const key = formatDateKey(date);
    return cycleData[key]?.type;
  };

  const getDayClass = (date: Date, isCurrentMonth: boolean) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const dayType = getDayType(date);
    
    let baseClass = "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all cursor-pointer ";
    
    if (!isCurrentMonth) {
      baseClass += "text-gray-300 ";
    } else {
      baseClass += "text-gray-700 hover:bg-pink-100 ";
    }
    
    if (isToday) {
      baseClass += "ring-2 ring-pink-500 ";
    }
    
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      baseClass += "bg-pink-500 text-white ";
    } else {
      switch (dayType) {
        case 'menstruation':
          baseClass += "bg-red-500 text-white ";
          break;
        case 'fertile':
          baseClass += "bg-green-500 text-white ";
          break;
        case 'ovulation':
          baseClass += "bg-purple-500 text-white ";
          break;
      }
    }
    
    return baseClass;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowAddEntry(true);
    
    // Carregar dados existentes se houver
    const key = formatDateKey(date);
    const existingData = cycleData[key];
    if (existingData) {
      setTemperature(existingData.temperature?.toString() || '');
      setSymptoms(existingData.symptoms || []);
      setNotes(existingData.notes || '');
    } else {
      setTemperature('');
      setSymptoms([]);
      setNotes('');
      setFlowIntensity('');
    }
  };

  const handleSaveEntry = () => {
    if (!selectedDate) return;
    
    const key = formatDateKey(selectedDate);
    const newEntry: CycleDay = {
      date: selectedDate,
      temperature: temperature ? parseFloat(temperature) : undefined,
      symptoms,
      notes
    };
    
    // Determinar tipo baseado nos sintomas/dados
    if (symptoms.includes('Menstruação') || flowIntensity) {
      newEntry.type = 'menstruation';
    }
    
    setCycleData(prev => ({
      ...prev,
      [key]: newEntry
    }));
    
    setShowAddEntry(false);
    setSelectedDate(null);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <ProtectedRoute>
      <div className="min-h-screen pb-20 lg:pb-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <CalendarIcon className="w-6 h-6 text-pink-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Calendário Menstrual
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth('prev')}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth('next')}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Week headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((day, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day.date)}
                        className={getDayClass(day.date, day.isCurrentMonth)}
                      >
                        {day.date.getDate()}
                      </button>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Menstruação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Janela Fértil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      <span>Ovulação</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Cycle Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    Informações do Ciclo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <p className="text-2xl font-bold text-pink-600">28</p>
                    <p className="text-sm text-pink-700">Duração média do ciclo</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Último período:</span>
                      <span className="text-sm font-medium">15/12/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Próximo período:</span>
                      <span className="text-sm font-medium">12/01/2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Janela fértil:</span>
                      <span className="text-sm font-medium">26/12 - 02/01</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Temperatura hoje</span>
                    </div>
                    <span className="text-sm font-medium">36.5°C</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-500" />
                      <span className="text-sm">Muco cervical</span>
                    </div>
                    <span className="text-sm font-medium">Cremoso</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <NotebookPen className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Registros este mês</span>
                    </div>
                    <span className="text-sm font-medium">12</span>
                  </div>
                </CardContent>
              </Card>

              {/* Add Entry Button */}
              <Button 
                onClick={() => setShowAddEntry(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Registro
              </Button>
            </div>
          </div>

          {/* Add Entry Modal */}
          {showAddEntry && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>
                    Registro para {selectedDate?.toLocaleDateString('pt-BR')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="temperature">Temperatura Basal (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="36.5"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="flow">Intensidade do Fluxo</Label>
                    <Select value={flowIntensity} onValueChange={setFlowIntensity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a intensidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sem fluxo</SelectItem>
                        <SelectItem value="light">Leve</SelectItem>
                        <SelectItem value="medium">Moderado</SelectItem>
                        <SelectItem value="heavy">Intenso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Sintomas</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {symptomOptions.map(symptom => (
                        <label key={symptom} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={symptoms.includes(symptom)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSymptoms(prev => [...prev, symptom]);
                              } else {
                                setSymptoms(prev => prev.filter(s => s !== symptom));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>{symptom}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      placeholder="Adicione suas observações..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddEntry(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveEntry}
                      className="flex-1 bg-pink-500 hover:bg-pink-600"
                    >
                      Salvar
                    </Button>
                  </div>
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