/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MugFrontOption } from '../types';
import { FRONT_OPTIONS } from '../data';
import { Heart, Sparkles } from 'lucide-react';

interface Step1FrontProps {
  selectedFrontId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}

export default function Step1Front({ selectedFrontId, onSelect, onNext }: Step1FrontProps) {
  const handleSelect = (id: string) => {
    onSelect(id);
    // Auto-advance after a brief delay to show the highlight animation
    setTimeout(() => {
      onNext();
    }, 400);
  };

  return (
    <div id="step-1-container" className="animate-fade-in space-y-5">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Coleção Dia dos Namorados
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
          Escolha a frente da sua caneca
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          Selecione o design ou frase que mais combina com vocês! ❤️
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 pt-2">
        {FRONT_OPTIONS.map((option: MugFrontOption) => {
          const isSelected = selectedFrontId === option.id;
          return (
            <button
              key={option.id}
              id={`front-option-${option.id}`}
              onClick={() => handleSelect(option.id)}
              className={`group relative flex flex-col items-center bg-white rounded-2xl border-2 text-left overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer ${
                isSelected
                  ? 'border-red-500 ring-2 ring-red-100 scale-[1.02] bg-rose-50/10'
                  : 'border-slate-100 hover:border-rose-200'
              }`}
            >
              {/* Image Container with aspect ratio 4:3 for elegant spacing */}
              <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Floating Heart Checkmark indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md animate-bounce">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="p-3 w-full flex-1 flex flex-col justify-center text-center">
                <h3 className={`text-sm font-bold leading-tight ${
                  isSelected ? 'text-red-700' : 'text-slate-800'
                }`}>
                  {option.name}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Helpful Hint */}
      <div className="bg-rose-50/50 rounded-xl p-3 border border-rose-100/50 text-center">
        <p className="text-xs text-rose-700/90 font-medium flex items-center justify-center gap-1.5">
          👉 <span className="font-semibold">Dica:</span> Ao selecionar uma opção, o app avança automaticamente!
        </p>
      </div>
    </div>
  );
}
