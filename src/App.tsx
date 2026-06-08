/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WizardHeader from './components/WizardHeader';
import WelcomeScreen from './components/WelcomeScreen';
import Step1Front from './components/Step1Front';
import Step2Back from './components/Step2Back';
import Step4Packaging from './components/Step4Packaging';
import { OrderState, VersoType } from './types';
import { MUG_MODELS, FRONT_OPTIONS, PACKAGING_OPTIONS, getPackagingPrice } from './data';
import { Heart, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<number>(0);
  
  useEffect(() => {
    // Scroll both window and inner container to the top on step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const contentContainer = document.getElementById('main-scrollable-content');
    if (contentContainer) {
      contentContainer.scrollTo({ top: 0, behavior: 'instant' as any }); // 'instant' or 'auto' works flawlessly for resets
    }
  }, [step]);
  
  // Set default selections to prevent empty state crashes
  const [order, setOrder] = useState<OrderState>({
    frontId: FRONT_OPTIONS[0].id,
    backType: '',
    backData: {
      coupleNames: '',
      anniversaryDate: '',
      songName: ''
    },
    mugModelId: MUG_MODELS[0].id,
    packagingId: ''
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFront = (id: string) => {
    setOrder(prev => ({ ...prev, frontId: id }));
  };

  const updateBackType = (type: VersoType) => {
    setOrder(prev => ({ ...prev, backType: type }));
  };

  const updateBackData = (data: { coupleNames?: string; anniversaryDate?: string; songName?: string }) => {
    setOrder(prev => ({
      ...prev,
      backData: {
        ...prev.backData,
        ...data
      }
    }));
  };

  const updateMugModel = (id: string) => {
    setOrder(prev => ({ ...prev, mugModelId: id }));
  };

  const updatePackaging = (id: string) => {
    setOrder(prev => ({ ...prev, packagingId: id }));
  };

  // Helper info for calculating totals and models
  const currentMug = MUG_MODELS.find(m => m.id === order.mugModelId) || MUG_MODELS[0];
  const currentPkg = PACKAGING_OPTIONS.find(p => p.id === order.packagingId) || PACKAGING_OPTIONS[0];

  const handleStep4Next = () => {
    // End of workflow - already handled by direct WhatsApp links
  };

  // Render proper step content
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <WelcomeScreen
            onStart={() => setStep(1)}
          />
        );
      case 1:
        return (
          <Step1Front
            selectedFrontId={order.frontId}
            onSelect={updateFront}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2Back
            selectedBackType={order.backType}
            backData={order.backData}
            onSelectType={updateBackType}
            onUpdateData={updateBackData}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <Step4Packaging
            selectedPackagingId={order.packagingId}
            selectedMugModel={currentMug}
            onSelect={updatePackaging}
            onNext={handleStep4Next}
            order={order}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-stone-100 flex items-center justify-center font-sans">
      
      {/* Background decoration (Only visible on wide desktop viewports) */}
      <div className="hidden lg:block absolute inset-0 -z-10 bg-[radial-gradient(#ffe4e6_1px,transparent_1px)] [background-size:16px_16px] bg-stone-50 overflow-hidden">
        <div className="absolute top-10 left-10 text-rose-200 animate-pulse">
          <Heart className="w-12 h-12 fill-current" />
        </div>
        <div className="absolute bottom-20 right-20 text-rose-200 animate-bounce" style={{ animationDuration: '4s' }}>
          <Heart className="w-16 h-16 fill-current" />
        </div>
        <div className="absolute top-1/3 right-12 text-rose-200 animate-pulse" style={{ animationDuration: '3s' }}>
          <Sparkles className="w-8 h-8 font-light" />
        </div>
        <div className="absolute bottom-1/3 left-16 text-rose-200 animate-bounce">
          <Sparkles className="w-10 h-10 font-light" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-rose-50/50 -z-20 blur-3xl" />
      </div>

      {/* Primary Mobile Viewport Constraint Box */}
      <div id="phone-container" className="w-full max-w-md min-h-screen lg:min-h-[850px] lg:my-8 lg:rounded-[40px] lg:shadow-2xl bg-[#fffdfd] overflow-hidden flex flex-col justify-between border-0 lg:border-8 lg:border-slate-800 relative">
        
        {/* Notch / Speaker header graphic just for high fidelity mockup look */}
        <div className="hidden lg:flex justify-center bg-slate-800 h-6 w-full absolute top-0 left-0 z-50 rounded-t-[32px]">
          <div className="w-28 h-4 bg-slate-900 rounded-b-xl flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-700 rounded-full" />
            <div className="w-2 h-2 bg-slate-800 rounded-full ml-2" />
          </div>
        </div>

        {/* Outer content container adjusting for Notch padding on native emulator look */}
        <div className="flex-1 flex flex-col justify-between lg:pt-6">
          
          {/* Wizard navigation and progress bar tracker */}
          {step > 0 && (
            <WizardHeader
              currentStep={step}
              totalSteps={3}
              onBack={prevStep}
            />
          )}

          {/* Core scrollable interaction layout */}
          <main id="main-scrollable-content" className="flex-1 overflow-y-auto px-4.5 py-5 pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Sticky checkout controller button block (fished at the bottom of standard mobile setup) */}
          {step > 0 && step < 3 && (
            <div id="sticky-footer" className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto z-20 px-4.5 py-4 bg-[#fffdfd]/90 backdrop-blur-md border-t border-rose-100/30 flex items-center justify-between gap-3 lg:absolute lg:bottom-0 lg:rounded-b-[32px]">
              
              {step === 1 && (
                <div className="w-full flex justify-between items-center bg-rose-50/70 p-2.5 rounded-xl border border-rose-100/30">
                  <p className="text-[10px] text-rose-800 font-bold leading-normal flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 fill-rose-50 shrink-0" />
                    Selecione uma estampa acima para prosseguir!
                  </p>
                  <button
                    id="footer-next-stage-1"
                    onClick={nextStep}
                    className="bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Próximo Passo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Step 2 handles its own styled action inside components to secure clean form validators */}
              {step === 2 && (
                <div className="w-full text-center text-[10px] text-gray-500 font-medium">
                  Insira as informações acima e clique em <span className="font-bold text-red-600">Confirmar Verso</span>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
