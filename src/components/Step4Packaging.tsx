/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PackagingOption, MugModelOption } from '../types';
import { PACKAGING_OPTIONS, getPackagingPrice } from '../data';
import { Check, Flame, Gift } from 'lucide-react';

interface Step4PackagingProps {
  selectedPackagingId: string;
  selectedMugModel: MugModelOption;
  onSelect: (id: string) => void;
  onNext: () => void;
}

export default function Step4Packaging({
  selectedPackagingId,
  selectedMugModel,
  onSelect,
  onNext
}: Step4PackagingProps) {
  
  const getSelectedPackagingPrice = () => {
    return getPackagingPrice(selectedPackagingId, selectedMugModel.price);
  };

  const handleSelect = (id: string) => {
    onSelect(id);
  };

  const currentTotal = selectedMugModel.price + getSelectedPackagingPrice();

  return (
    <div id="step-4-container" className="animate-fade-in space-y-5">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5" />
          Embrulho Especial
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
          Adicione uma linda embalagem
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          Dê mais impacto ao seu presente! Escolha caixas com fita de cetim ou cestas completas. 💝
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-2">
        {PACKAGING_OPTIONS.map((pkg: PackagingOption) => {
          const isSelected = selectedPackagingId === pkg.id;
          const pkgPrice = getPackagingPrice(pkg.id, selectedMugModel.price);
          return (
            <button
              key={pkg.id}
              id={`packaging-option-${pkg.id}`}
              onClick={() => handleSelect(pkg.id)}
              className={`group relative flex flex-col justify-between bg-white rounded-2xl border-2 text-left overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer ${
                isSelected
                  ? 'border-red-500 ring-2 ring-red-100 scale-[1.01] bg-rose-50/10'
                  : 'border-slate-100 hover:border-rose-100'
              }`}
            >
              <div>
                <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md">
                      <Check className="w-3.5 h-3.5 font-extrabold stroke-[3]" />
                    </div>
                  )}
                  {pkg.price > 15 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tight flex items-center gap-0.5 animate-pulse">
                      <Flame className="w-2.5 h-2.5 fill-current" />
                      Mais Vendido
                    </span>
                  )}
                </div>

                <div className="p-2.5 space-y-1">
                  <h3 className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-red-700 font-extrabold' : 'text-slate-800'
                  }`}>
                    {pkg.name}
                  </h3>
                </div>
              </div>

              {/* Price adjustment */}
              <div className="p-2.5 pt-0 border-t border-slate-50 mt-1 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Adicional:</span>
                <span className="text-sm font-extrabold text-slate-950 font-sans">
                  {pkgPrice === 0 ? 'Grátis' : `+ R$ ${pkgPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live total display box */}
      <div className="bg-red-500 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider opacity-90">Valor do seu pedido:</p>
          <p className="text-xs opacity-80 font-medium">
            Mug ({selectedMugModel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
            {getSelectedPackagingPrice() > 0 && ` + Embalagem (${getSelectedPackagingPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold opacity-90">Total Acumulado</p>
          <p className="text-2xl font-extrabold font-sans leading-none mt-0.5">
            R$ {currentTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}
