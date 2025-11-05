"use client";

import { Heart, Calendar, Users, BookOpen, Sparkles, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ActiveSection = 'dashboard' | 'tracker' | 'detox' | 'fertility' | 'intimacy' | 'profile';

interface NavigationProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const navigationItems = [
    {
      id: 'dashboard' as ActiveSection,
      icon: Sparkles,
      label: 'Dashboard',
      description: 'Visão geral',
      gradient: 'from-violet-400 to-purple-500'
    },
    {
      id: 'tracker' as ActiveSection,
      icon: Calendar,
      label: 'Ciclo Menstrual',
      description: 'Acompanhe seu ciclo',
      gradient: 'from-rose-400 to-pink-500'
    },
    {
      id: 'detox' as ActiveSection,
      icon: BookOpen,
      label: 'Protocolo Detox',
      description: 'Limpeza corporal',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'fertility' as ActiveSection,
      icon: Heart,
      label: 'Fertilidade Avançada',
      description: 'Otimize a concepção',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      id: 'intimacy' as ActiveSection,
      icon: Users,
      label: 'Guia de Intimidade',
      description: 'Boas práticas',
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      id: 'profile' as ActiveSection,
      icon: Baby,
      label: 'Perfil do Casal',
      description: 'Seus dados',
      gradient: 'from-cyan-400 to-blue-500'
    }
  ];

  return (
    <Card className="p-4 bg-white/60 backdrop-blur-sm border-rose-100">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Navegação</h2>
        
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={`w-full justify-start h-auto p-3 transition-all duration-200 ${
              activeSection === item.id
                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl`
                : 'hover:bg-rose-50 text-gray-700 hover:text-rose-600'
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`p-2 rounded-lg ${
                activeSection === item.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-100'
              }`}>
                <item.icon className={`w-5 h-5 ${
                  activeSection === item.id ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                <div className={`text-xs ${
                  activeSection === item.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}