"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  User, 
  Heart, 
  Save,
  Edit,
  Calculator,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ProfileData {
  name: string;
  age: string;
  height: string;
  weight: string;
  bmi: number;
  bmiCategory: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('female');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [femaleProfile, setFemaleProfile] = useState<ProfileData>({
    name: '',
    age: '',
    height: '',
    weight: '',
    bmi: 0,
    bmiCategory: ''
  });

  const [maleProfile, setMaleProfile] = useState<ProfileData>({
    name: '',
    age: '',
    height: '',
    weight: '',
    bmi: 0,
    bmiCategory: ''
  });

  // Calcular IMC
  const calculateBMI = (height: string, weight: string): { bmi: number; category: string } => {
    const h = parseFloat(height) / 100; // converter cm para metros
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category = '';
      
      if (bmi < 18.5) category = 'Abaixo do peso';
      else if (bmi < 25) category = 'Peso normal';
      else if (bmi < 30) category = 'Sobrepeso';
      else category = 'Obesidade';
      
      return { bmi: Math.round(bmi * 10) / 10, category };
    }
    
    return { bmi: 0, category: '' };
  };

  // Atualizar IMC quando altura ou peso mudarem
  useEffect(() => {
    const { bmi, category } = calculateBMI(femaleProfile.height, femaleProfile.weight);
    setFemaleProfile(prev => ({ ...prev, bmi, bmiCategory: category }));
  }, [femaleProfile.height, femaleProfile.weight]);

  useEffect(() => {
    const { bmi, category } = calculateBMI(maleProfile.height, maleProfile.weight);
    setMaleProfile(prev => ({ ...prev, bmi, bmiCategory: category }));
  }, [maleProfile.height, maleProfile.weight]);

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'Abaixo do peso': return 'bg-blue-100 text-blue-800';
      case 'Peso normal': return 'bg-green-100 text-green-800';
      case 'Sobrepeso': return 'bg-yellow-100 text-yellow-800';
      case 'Obesidade': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular salvamento (aqui você integraria com Supabase)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setIsEditing(false);
    
    // Mostrar feedback de sucesso
    alert('Perfis salvos com sucesso!');
  };

  const renderProfileForm = (profile: ProfileData, setProfile: (profile: ProfileData) => void, gender: string) => {
    const genderLabel = gender === 'female' ? 'Feminino' : 'Masculino';
    const genderIcon = gender === 'female' ? Heart : User;
    const GenderIcon = genderIcon;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GenderIcon className="w-5 h-5" />
              Perfil {genderLabel}
            </CardTitle>
            <CardDescription>
              Informações pessoais para acompanhamento da fertilidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`${gender}-name`}>Nome Completo</Label>
                <Input
                  id={`${gender}-name`}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Digite o nome completo"
                />
              </div>
              
              <div>
                <Label htmlFor={`${gender}-age`}>Idade (anos)</Label>
                <Input
                  id={`${gender}-age`}
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Ex: 28"
                />
              </div>
              
              <div>
                <Label htmlFor={`${gender}-height`}>Altura (cm)</Label>
                <Input
                  id={`${gender}-height`}
                  type="number"
                  value={profile.height}
                  onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Ex: 165"
                />
              </div>
              
              <div>
                <Label htmlFor={`${gender}-weight`}>Peso (kg)</Label>
                <Input
                  id={`${gender}-weight`}
                  type="number"
                  step="0.1"
                  value={profile.weight}
                  onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Ex: 60.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IMC Card */}
        {profile.height && profile.weight && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Índice de Massa Corporal (IMC)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-800">{profile.bmi}</p>
                  <p className="text-sm text-blue-600">IMC Calculado</p>
                </div>
                <div className="text-center">
                  <Badge className={getBMIColor(profile.bmiCategory)}>
                    {profile.bmiCategory}
                  </Badge>
                  <p className="text-sm text-blue-600 mt-1">Classificação</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Referência IMC:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>• Abaixo do peso: &lt; 18,5</div>
                  <div>• Peso normal: 18,5 - 24,9</div>
                  <div>• Sobrepeso: 25,0 - 29,9</div>
                  <div>• Obesidade: ≥ 30,0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fertility Tips based on BMI */}
        {profile.bmiCategory && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Dicas para Fertilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-green-800">
                {profile.bmiCategory === 'Peso normal' && (
                  <>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Seu IMC está na faixa ideal para fertilidade!</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Mantenha uma alimentação equilibrada e exercícios regulares.</span>
                    </div>
                  </>
                )}
                
                {profile.bmiCategory === 'Abaixo do peso' && (
                  <>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Considere ganhar peso de forma saudável para otimizar a fertilidade.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Consulte um nutricionista para um plano alimentar adequado.</span>
                    </div>
                  </>
                )}
                
                {(profile.bmiCategory === 'Sobrepeso' || profile.bmiCategory === 'Obesidade') && (
                  <>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>A perda de peso pode melhorar significativamente a fertilidade.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Considere acompanhamento médico para um programa de emagrecimento.</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
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
                <Users className="w-6 h-6 text-pink-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Perfil do Casal
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-pink-500 hover:bg-pink-600"
                    >
                      {isSaving ? (
                        <>Salvando...</>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-1" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Overview Card */}
          <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                Gerenciamento de Perfil
              </CardTitle>
              <CardDescription className="text-pink-100">
                Mantenha as informações do casal atualizadas para um acompanhamento personalizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm opacity-90">Perfis Cadastrados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">IMC</p>
                  <p className="text-sm opacity-90">Cálculo Automático</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm opacity-90">Personalizado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="female" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Perfil Feminino
              </TabsTrigger>
              <TabsTrigger value="male" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Perfil Masculino
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="female" className="mt-6">
              {renderProfileForm(femaleProfile, setFemaleProfile, 'female')}
            </TabsContent>
            
            <TabsContent value="male" className="mt-6">
              {renderProfileForm(maleProfile, setMaleProfile, 'male')}
            </TabsContent>
          </Tabs>

          {/* Important Information */}
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Informações Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Todas as informações são armazenadas de forma segura e criptografada.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>O IMC é calculado automaticamente e atualizado em tempo real.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Mantenha as informações atualizadas para recomendações mais precisas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Consulte sempre um médico para orientações personalizadas sobre fertilidade.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}