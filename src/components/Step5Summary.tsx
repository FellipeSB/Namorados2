/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MugFrontOption, MugBackOption, MugModelOption, PackagingOption, OrderState } from '../types';
import { FRONT_OPTIONS, BACK_OPTIONS, MUG_MODELS, PACKAGING_OPTIONS, WHATSAPP_CONTACT_NUMBER, getPackagingPrice } from '../data';
import { Landmark, MessageSquareText, ShieldCheck, ShoppingBag, PhoneCall, Sparkles } from 'lucide-react';

interface Step5SummaryProps {
  order: OrderState;
}

export default function Step5Summary({ order }: Step5SummaryProps) {
  const [showStickyButton, setShowStickyButton] = useState(true);

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scrollable-content');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Scrollable range check: if remaining scroll is small, hide
      const nearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowStickyButton(!nearBottom);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    // Delay check slightly to let DOM render completely and settle heights
    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Find correct options based on IDs
  const frontOption = FRONT_OPTIONS.find(f => f.id === order.frontId) || FRONT_OPTIONS[0];
  const backOption = BACK_OPTIONS.find(b => b.id === order.backType) || BACK_OPTIONS[0];
  const mugModel = MUG_MODELS.find(m => m.id === order.mugModelId) || MUG_MODELS[0];
  const packaging = PACKAGING_OPTIONS.find(p => p.id === order.packagingId) || PACKAGING_OPTIONS[0];

  const packagingPrice = getPackagingPrice(order.packagingId, mugModel.price);
  const total = mugModel.price + packagingPrice;

  // Format data string for WhatsApp and screen
  const getFormattedDataText = () => {
    switch (order.backType) {
      case 'calendario':
        return `Data de namoro: ${order.backData.anniversaryDate || 'Não informada'} | Nomes: ${order.backData.coupleNames || 'Não informado'}`;
      case 'spotify':
        return `Música: ${order.backData.songName || 'Não informada'} | Nomes: ${order.backData.coupleNames || 'Não informado'} (Foto enviada via WhatsApp)`;
      case 'foto':
        return `Estampagem de Foto (Foto enviada via WhatsApp)`;
      case 'nome':
        return `Nomes no casal: ${order.backData.coupleNames || 'Não informado'}`;
      default:
        return 'Nenhum dado adicional';
    }
  };

  const generateWhatsAppLink = () => {
    const dadosText = getFormattedDataText();
    
    const message = `*💝 NOVO PEDIDO - TIME IMPRINT 💝*
_Especial Dia dos Namorados_ 🗓️

Olá! Acabei de montar meu pedido personalizado pelo site e quero confirmar os detalhes por aqui:

🎨 *FRENTE DA CANECA*
• ${frontOption.name}

🔄 *VERSO DA CANECA*
• ${backOption.name}

📝 *DADOS DA PERSONALIZAÇÃO*
• ${dadosText}

☕ *MODELO DA CANECA*
• ${mugModel.name}

🎁 *EMBALAGEM / ADICIONAL*
• ${packaging.name}

━━━━━━━━━━━━━━━━━━━━━

⏳ *PRAZO DE PRODUÇÃO*
• *Fica pronto antes de Dia dos Namorados!* 🚀

📦 *ENTREGA OU RETIRADA*
• A combinar pelo WhatsApp 📍

💵 *VALOR TOTAL*
• *R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*

━━━━━━━━━━━━━━━━━━━━━

Como posso prosseguir com o pagamento e combinar a entrega/retirada? ✨`;

    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedMessage}`;
  };

  return (
    <div id="step-5-container" className="animate-fade-in space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Quase Pronto!
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
          Resumo do seu pedido
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          Confira abaixo se everything está correto antes de nos enviar pelo WhatsApp! ✨
        </p>
      </div>

      {/* Styled Romantic Receipt */}
      <div className="relative bg-white rounded-3xl border-2 border-slate-100 shadow-lg overflow-hidden">
        {/* Top visual accent */}
        <div className="bg-rose-500 py-3.5 px-5 text-center text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5">
          <ShoppingBag className="w-4 h-4" />
          Recibo de Personalização
        </div>

        <div className="p-5 space-y-4">
          {/* Step 1: Frente */}
          <div className="flex items-start gap-3 border-b border-dashed border-slate-100 pb-3" id="summary-front">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
              <img src={frontOption.image} alt={frontOption.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-600">Frente Escolhida</span>
              <h4 className="text-xs font-bold text-slate-950 leading-tight">{frontOption.name}</h4>
              <p className="text-[10px] text-gray-400 font-medium">{frontOption.description}</p>
            </div>
          </div>

          {/* Step 2: Verso e Dados editados */}
          <div className="flex items-start gap-3 border-b border-dashed border-slate-100 pb-3" id="summary-back">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
              <img src={backOption.image} alt={backOption.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-0.5 flex-1min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-600">Verso & Customização</span>
              <h4 className="text-xs font-bold text-slate-950 leading-tight">{backOption.name}</h4>
              <div className="bg-rose-50/50 p-2 rounded-lg border border-rose-100/30 text-[10px] text-rose-950 leading-relaxed font-semibold mt-1.5">
                {getFormattedDataText()}
              </div>
            </div>
          </div>

          {/* Step 3: Modelo Canaquinha */}
          <div className="flex items-start gap-3 border-b border-dashed border-slate-100 pb-3" id="summary-mug-model">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
              <img src={mugModel.image} alt={mugModel.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-600">Tipo de Caneca</span>
              <div className="flex items-baseline justify-between">
                <h4 className="text-xs font-bold text-slate-950 leading-tight">{mugModel.name}</h4>
                <span className="text-xs font-bold text-slate-800 shrink-0 ml-1.5">
                  R$ {mugModel.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: Embalagem */}
          <div className="flex items-start gap-3 border-b border-dashed border-slate-100 pb-3" id="summary-packaging">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
              <img src={packaging.image} alt={packaging.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-600">Embalagem</span>
              <div className="flex items-baseline justify-between">
                <h4 className="text-xs font-bold text-slate-950 leading-tight">{packaging.name}</h4>
                <span className="text-xs font-bold text-slate-800 shrink-0 ml-1.5">
                  {packagingPrice === 0 ? 'Grátis' : `R$ ${packagingPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </span>
              </div>
            </div>
          </div>

          {/* Grand total price banner */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Prazo de Produção</p>
              <p className="text-[11px] text-rose-600 font-extrabold">Fica pronto antes de Dia dos Namorados! 🚀</p>
              <p className="text-[10px] text-gray-500 font-medium">Entrega ou Retirada a combinar pelo WhatsApp</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-rose-600 font-sans tracking-tight">
                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative receipt zig zag footer wrapper */}
        <div className="h-2 bg-slate-50/70 border-t border-slate-100 flex overflow-hidden justify-around">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-white border border-slate-100 rounded-full -translate-y-[6px]" />
          ))}
        </div>
      </div>

      {/* Guide Banner */}
      <div className="bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed">
        <div className="bg-emerald-500 text-white rounded-full p-1 h-fit shrink-0 mt-0.5">
          <PhoneCall className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="font-bold block text-emerald-950 mb-0.5">Como enviamos os detalhes?</span>
          Ao clicar no botão verde abaixo, criaremos a sua mensagem certinha no WhatsApp da nossa Time Imprint. Você então envia ela e a foto desejada no próprio chat. Pronto, começamos a produzir imediatamente! ❤️
        </div>
      </div>

      {/* Pulsing Core Action Button */}
      <div className="pt-2">
        <a
          id="btn-whatsapp-send-order"
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse flex items-center justify-center gap-2.5 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-transform hover:scale-[1.01] uppercase tracking-wide cursor-pointer"
        >
          <MessageSquareText className="w-5 h-5 fill-current" />
          Enviar meu pedido no WhatsApp
        </a>
      </div>

      {/* Brand Footer */}
      <div className="text-center text-[10px] text-slate-400 font-medium pt-3 pb-16">
        Desenvolvido por <span className="font-bold text-rose-500">Time Imprint</span> • Envios Rápidos 🚀
      </div>

      {/* Sticky Bottom Floating WhatsApp Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto z-40 px-4.5 py-4 bg-[#fffdfd]/95 backdrop-blur-md border-t border-rose-100/30 flex items-center justify-center lg:absolute lg:bottom-0 lg:rounded-b-[32px] transition-all duration-300 ${
          showStickyButton ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <a
          id="sticky-btn-whatsapp-send-order"
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse flex items-center justify-center gap-2.5 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-[1.01] transition-all uppercase tracking-wide cursor-pointer"
        >
          <MessageSquareText className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          Enviar meu pedido no WhatsApp
        </a>
      </div>
    </div>
  );
}
