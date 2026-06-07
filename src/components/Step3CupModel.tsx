/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MugModelOption } from '../types';
import { MUG_MODELS } from '../data';
import { Check, Info, Sparkles } from 'lucide-react';

interface Step3CupModelProps {
  selectedMugModelId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}

export default function Step3CupModel({
  selectedMugModelId,
  onSelect,
  onNext
}: Step3CupModelProps) {
  const getCategoryLabel = (category: 'branca' | 'colorida' | 'coracao' | 'colher') => {
    switch (category) {
      case 'branca':
        return 'Clássica';
      case 'colorida':
        return 'Alça & Interno Coloridos';
      case 'coracao':
        return 'Alça de Coração';
      case 'colher':
        return 'Acompanha Colher';
    }
  };

  const handleSelectAndAdvance = (id: string) => {
    onSelect(id);
    // Slight timeout for high responsiveness & feedback
    setTimeout(() => {
      onNext();
    }, 400);
  };

  return (
    <div id="step-3-container" className="animate-fade-in space-y-5">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
          Escolha o modelo da sua caneca
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          Temos opções clássicas, românticas e super práticas com colher! ☕
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-2">
        {MUG_MODELS.map((model: MugModelOption) => {
          const isSelected = selectedMugModelId === model.id;
          return (
            <button
              key={model.id}
              id={`mug-option-${model.id}`}
              onClick={() => handleSelectAndAdvance(model.id)}
              className={`group relative flex flex-col justify-between bg-white rounded-2xl border-2 text-left overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer ${
                isSelected
                  ? 'border-red-500 ring-2 ring-red-100 scale-[1.01] bg-rose-50/10'
                  : 'border-slate-100 hover:border-rose-100'
              }`}
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-[9px] text-white px-1.5 py-0.5 rounded-md font-semibold font-mono tracking-tight uppercase">
                    {getCategoryLabel(model.category)}
                  </span>

                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md">
                      <Check className="w-3.5 h-3.5 font-extrabold stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-2.5 space-y-1">
                  <h3 className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-red-700 font-extrabold' : 'text-slate-800'
                  }`}>
                    {model.name}
                  </h3>
                </div>
              </div>

              {/* Price Tag always locked cleanly at the bottom */}
              <div className="p-2.5 pt-0 border-t border-slate-50 mt-1">
                <span className="text-sm font-extrabold text-slate-950 font-sans">
                  R$ {model.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info notice about premium quality */}
      <div className="bg-rose-50/60 rounded-xl p-3 border border-rose-100/50 flex gap-2 item-start">
        <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-[11px] font-bold text-rose-900 leading-tight">Canecas de alta qualidade premium</p>
          <p className="text-[10px] text-rose-700 leading-normal">
            Porcelana importada classe AAA com brilho intenso. Adequadas para micro-ondas e lava-louças sem perda de brilho ou descasque!
          </p>
        </div>
      </div>
    </div>
  );
}
