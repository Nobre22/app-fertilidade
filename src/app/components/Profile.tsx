"use client";

import { useState } from "react";
import { User, Users, Heart, Calendar, Edit3, Save, Baby, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Dados da Mulher
    femaleName: "Ana Silva",
    femaleAge: "28",
    femaleHeight: "165",
    femaleWeight: "62",
    femaleEmail: "ana@email.com",
    femalePhone: "(11) 99999-9999",
    
    // Dados do Homem
    maleName: "João Silva",
    maleAge: "30",
    maleHeight: "178",
    maleWeight: "75",
    maleEmail: "joao@email.com",
    malePhone: "(11) 88888-8888",
    
    // Dados do Relacionamento
    relationshipStart: "2020-02-14",
    tryingToConceive: "2024-01-01",
    
    // Histórico Médico
    femaleConditions: "Nenhuma condição conhecida",
    maleConditions: "Nenhuma condição conhecida",
    medications: "Ácido fólico (Ana), Multivitamínico (João)",
    
    // Objetivos
    goals: "Engravidar naturalmente nos próximos 6 meses",
    notes: "Começamos o protocolo de detox em janeiro. Ana tem ciclos regulares de 28 dias."
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você salvaria os dados no banco/localStorage
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateBMI = (weight: string, height: string) => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) {
      const bmi = w / (h * h);
      return bmi.toFixed(1);
    }
    return "0";
  };

  const getBMICategory = (bmi: string) => {
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return { category: "Abaixo do peso", color: "text-blue-600" };
    if (bmiNum < 25) return { category: "Peso normal", color: "text-green-600" };
    if (bmiNum < 30) return { category: "Sobrepeso", color: "text-yellow-600" };
    return { category: "Obesidade", color: "text-red-600" };
  };

  const femaleBMI = calculateBMI(profileData.femaleWeight, profileData.femaleHeight);
  const maleBMI = calculateBMI(profileData.maleWeight, profileData.maleHeight);
  const femaleBMICategory = getBMICategory(femaleBMI);
  const maleBMICategory = getBMICategory(maleBMI);

  const calculateTryingDuration = () => {
    const startDate = new Date(profileData.tryingToConceive);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    return `${months} meses e ${days} dias`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Perfil do Casal</h2>
          <p className="text-gray-600">Gerencie suas informações pessoais e médicas</p>
        </div>
        
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={isEditing ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-500 hover:bg-rose-600"}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>

      {/* Relationship Overview */}
      <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {profileData.femaleName} & {profileData.maleName}
              </h3>
              <p className="text-rose-100 mb-4 text-sm sm:text-base">
                Juntos desde {new Date(profileData.relationshipStart).toLocaleDateString('pt-BR')}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-white/20 text-white border-white/30 text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  Tentando engravidar há {calculateTryingDuration()}
                </Badge>
              </div>
            </div>
            <div className="text-center sm:text-right flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto sm:mx-0">
                <Baby className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-xs sm:text-sm text-rose-100 whitespace-nowrap">Jornada da Fertilidade</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Female Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-rose-600">
              <User className="w-5 h-5" />
              <span>Perfil Feminino</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="femaleName">Nome</Label>
                <Input
                  id="femaleName"
                  value={profileData.femaleName}
                  onChange={(e) => handleInputChange('femaleName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="femaleAge">Idade</Label>
                <Input
                  id="femaleAge"
                  type="number"
                  value={profileData.femaleAge}
                  onChange={(e) => handleInputChange('femaleAge', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="femaleHeight">Altura (cm)</Label>
                <Input
                  id="femaleHeight"
                  type="number"
                  value={profileData.femaleHeight}
                  onChange={(e) => handleInputChange('femaleHeight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="femaleWeight">Peso (kg)</Label>
                <Input
                  id="femaleWeight"
                  type="number"
                  value={profileData.femaleWeight}
                  onChange={(e) => handleInputChange('femaleWeight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-rose-700">IMC</span>
                <div className="text-right">
                  <div className="font-bold text-rose-800">{femaleBMI}</div>
                  <div className={`text-xs ${femaleBMICategory.color}`}>
                    {femaleBMICategory.category}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="femaleEmail">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <Input
                    id="femaleEmail"
                    type="email"
                    value={profileData.femaleEmail}
                    onChange={(e) => handleInputChange('femaleEmail', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="femalePhone">Telefone</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <Input
                    id="femalePhone"
                    value={profileData.femalePhone}
                    onChange={(e) => handleInputChange('femalePhone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Male Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <Users className="w-5 h-5" />
              <span>Perfil Masculino</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maleName">Nome</Label>
                <Input
                  id="maleName"
                  value={profileData.maleName}
                  onChange={(e) => handleInputChange('maleName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="maleAge">Idade</Label>
                <Input
                  id="maleAge"
                  type="number"
                  value={profileData.maleAge}
                  onChange={(e) => handleInputChange('maleAge', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maleHeight">Altura (cm)</Label>
                <Input
                  id="maleHeight"
                  type="number"
                  value={profileData.maleHeight}
                  onChange={(e) => handleInputChange('maleHeight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="maleWeight">Peso (kg)</Label>
                <Input
                  id="maleWeight"
                  type="number"
                  value={profileData.maleWeight}
                  onChange={(e) => handleInputChange('maleWeight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">IMC</span>
                <div className="text-right">
                  <div className="font-bold text-blue-800">{maleBMI}</div>
                  <div className={`text-xs ${maleBMICategory.color}`}>
                    {maleBMICategory.category}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="maleEmail">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <Input
                    id="maleEmail"
                    type="email"
                    value={profileData.maleEmail}
                    onChange={(e) => handleInputChange('maleEmail', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="malePhone">Telefone</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <Input
                    id="malePhone"
                    value={profileData.malePhone}
                    onChange={(e) => handleInputChange('malePhone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-emerald-500" />
            <span>Histórico Médico</span>
          </CardTitle>
          <CardDescription>
            Informações importantes sobre saúde e medicamentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="femaleConditions">Condições Médicas (Mulher)</Label>
              <Textarea
                id="femaleConditions"
                value={profileData.femaleConditions}
                onChange={(e) => handleInputChange('femaleConditions', e.target.value)}
                disabled={!isEditing}
                placeholder="Ex: Endometriose, PCOS, etc."
              />
            </div>
            <div>
              <Label htmlFor="maleConditions">Condições Médicas (Homem)</Label>
              <Textarea
                id="maleConditions"
                value={profileData.maleConditions}
                onChange={(e) => handleInputChange('maleConditions', e.target.value)}
                disabled={!isEditing}
                placeholder="Ex: Varicocele, diabetes, etc."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="medications">Medicamentos e Suplementos Atuais</Label>
            <Textarea
              id="medications"
              value={profileData.medications}
              onChange={(e) => handleInputChange('medications', e.target.value)}
              disabled={!isEditing}
              placeholder="Liste todos os medicamentos e suplementos que vocês tomam"
            />
          </div>
        </CardContent>
      </Card>

      {/* Goals and Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span>Objetivos e Observações</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="relationshipStart">Início do Relacionamento</Label>
            <Input
              id="relationshipStart"
              type="date"
              value={profileData.relationshipStart}
              onChange={(e) => handleInputChange('relationshipStart', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="tryingToConceive">Início das Tentativas de Concepção</Label>
            <Input
              id="tryingToConceive"
              type="date"
              value={profileData.tryingToConceive}
              onChange={(e) => handleInputChange('tryingToConceive', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="goals">Objetivos</Label>
            <Textarea
              id="goals"
              value={profileData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              disabled={!isEditing}
              placeholder="Descreva seus objetivos e expectativas"
            />
          </div>

          <div>
            <Label htmlFor="notes">Observações Gerais</Label>
            <Textarea
              id="notes"
              value={profileData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              disabled={!isEditing}
              placeholder="Qualquer informação adicional relevante"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}