"use client";

import { Home, Calendar, BookOpen, Users, Activity, Settings } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const navigation = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Calendário', href: '/calendar', icon: Calendar },
  { name: 'Protocolos', href: '/protocols', icon: BookOpen },
  { name: 'Perfil', href: '/profile', icon: Users },
  { name: 'Progresso', href: '/progress', icon: Activity },
  { name: 'Guias', href: '/guides', icon: Settings },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-pink-100 safe-area-pb shadow-lg">
      <div className="grid grid-cols-6 gap-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all min-h-[60px] ${
                isActive
                  ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600'
                  : 'text-gray-500 hover:text-pink-500'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium leading-tight text-center">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}