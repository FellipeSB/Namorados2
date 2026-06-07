/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Heart, Sparkles } from 'lucide-react';

interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export default function WizardHeader({ currentStep, totalSteps, onBack }: WizardHeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <header id="wizard-header" className="sticky top-0 z-30 bg-[#fffdfd]/90 backdrop-blur-md border-b border-rose-100/50 px-4 py-3.5 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        {/* Left Side: Back Arrow or Mini Branding */}
        <div className="w-24">
          {currentStep >= 2 ? (
            <button
              id="header-back-button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-700 bg-slate-50 hover:bg-slate-100 active:scale-95 text-xs font-bold border border-slate-200 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              Voltar
            </button>
          ) : (
            <div className="flex items-center gap-1 text-slate-800 font-bold text-xs" id="header-brand-pill">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              Time Imprint
            </div>
          )}
        </div>

        {/* Center: Progress Text Badge */}
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-black tracking-wider text-rose-800 bg-rose-50 border border-rose-100/50 rounded-full font-mono">
            Passo {currentStep} de {totalSteps}
          </span>
        </div>

        {/* Right Side: Spacer to keep centering */}
        <div className="w-24 text-right">
        </div>
      </div>

      {/* Progress Bar with heart handle or custom smooth expansion */}
      <div className="relative w-full h-1.5 bg-rose-100/60 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-linear-to-r from-red-500 to-rose-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </header>
  );
}
