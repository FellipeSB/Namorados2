/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, MessageSquareHeart, Palette, Sparkles, Gift, Flame } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div id="welcome-container" className="animate-fade-in flex flex-col justify-between min-h-[70vh] py-2">
      {/* Hero Visual Accent */}
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center p-3 rounded-full bg-red-50 text-red-600 mb-2">
          <Heart className="w-8 h-8 fill-red-500 text-red-600 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
          </span>
        </div>

        <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight font-serif px-2">
          Monte sua <span className="text-rose-600 underline decoration-rose-200 decoration-wavy underline-offset-4">Caneca</span> e depois escolha sua <span className="text-rose-600 underline decoration-rose-200 decoration-wavy underline-offset-4">Cesta</span> de Dia dos Namorados.
        </h1>
      </div>

      {/* Steps Block Grid */}
      <div className="my-8 space-y-3.5 px-1">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#be123c]/70 flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          Como Funciona a Time Imprint?
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {/* Step 1 */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100/80 shadow-xs">
            <div className="p-2.5 rounded-xl bg-rose-50/70 text-rose-600 shrink-0">
              <MessageSquareHeart className="w-5 h-5 text-red-500 fill-rose-50" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] font-black uppercase tracking-wider text-rose-500 font-mono">Passo 1</span>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                Escolha a frase da Caneca
              </p>
              <p className="text-[10px] text-gray-400 leading-none">Vários templates românticos exclusivos</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100/80 shadow-xs">
            <div className="p-2.5 rounded-xl bg-orange-50/70 text-orange-600 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] font-black uppercase tracking-wider text-orange-500 font-mono">Passo 2</span>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                Escolha o verso
              </p>
              <p className="text-[10px] text-gray-400 leading-none">Personalize com Foto, Música do Spotify, Data de Namoro ou Nome</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100/80 shadow-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50/70 text-emerald-600 shrink-0">
              <Gift className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] font-black uppercase tracking-wider text-emerald-500 font-mono">Passo 3</span>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                Escolha em qual cesta ela vai ir
              </p>
              <p className="text-[10px] text-gray-400 leading-none">Adicione caixas românticas exclusivas ou lindas cestas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Big Action button at the bottom */}
      <div className="pt-2">
        <button
          id="btn-welcome-start"
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <Flame className="w-4.5 h-4.5 fill-current animate-bounce" />
          Vamos começar!
        </button>
        <p className="text-[9px] text-gray-400 text-center mt-2.5 font-semibold">
          Sem necessidade de cadastro ou cartão de crédito. Rápido e prático!
        </p>
      </div>
    </div>
  );
}
