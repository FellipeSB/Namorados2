/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PackagingOption, MugModelOption, OrderState } from '../types';
import { PACKAGING_OPTIONS, getPackagingPrice, FRONT_OPTIONS, BACK_OPTIONS, WHATSAPP_CONTACT_NUMBER } from '../data';
import { Check, Flame, Gift, X, MessageSquareText } from 'lucide-react';

interface Step4PackagingProps {
  selectedPackagingId: string;
  selectedMugModel: MugModelOption;
  onSelect: (id: string) => void;
  onNext: () => void;
  order: OrderState;
}

export default function Step4Packaging({
  selectedPackagingId,
  selectedMugModel,
  onSelect,
  onNext,
  order
}: Step4PackagingProps) {
  const [showStickyButton, setShowStickyButton] = useState(true);

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scrollable-content');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Hide sticky button when near bottom so it does not overlap footer elements
      const nearBottom = scrollHeight - scrollTop - clientHeight < 120;
      setShowStickyButton(!nearBottom);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSelect = (id: string) => {
    onSelect(id);
    const link = generateWhatsAppLink(id);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const selectedPkg = PACKAGING_OPTIONS.find(p => p.id === selectedPackagingId);
  const selectedPkgPrice = selectedPkg ? getPackagingPrice(selectedPackagingId, 38.90) : 0;

  const generateWhatsAppLink = (pkgId: string = selectedPackagingId) => {
    const frontOption = FRONT_OPTIONS.find(f => f.id === order.frontId) || FRONT_OPTIONS[0];
    const backOption = BACK_OPTIONS.find(b => b.id === order.backType) || BACK_OPTIONS[0];
    // Fallback to the target pkgId if provided, then to order.packagingId, then to default option
    const activePkgId = pkgId || order.packagingId || 'sem_embalagem';
    const packaging = PACKAGING_OPTIONS.find(p => p.id === activePkgId) || PACKAGING_OPTIONS[0];
    const total = getPackagingPrice(activePkgId, 0);

    const getFormattedDataText = () => {
      switch (order.backType) {
        case 'foto':
          return 'Estampagem de Foto (Foto enviada via WhatsApp) 📸';
        case 'spotify':
          return `Música: ${order.backData.songName || 'Não informada'}${order.backData.coupleNames ? ` | Casal: ${order.backData.coupleNames}` : ''} 🎵`;
        case 'calendario':
          return `Data Especial: ${order.backData.anniversaryDate || 'Não informada'}${order.backData.coupleNames ? ` | Casal: ${order.backData.coupleNames}` : ''} 📅`;
        case 'nome':
          return `Nomes no casal: ${order.backData.coupleNames || 'Não informados'} ✍️`;
        default:
          return 'Personalização Simples';
      }
    };

    const dadosText = getFormattedDataText();

    const message = `Olá! Acabei de montar meu pedido personalizado pelo site e quero confirmar os detalhes por aqui:

🎨 FRENTE DA CANECA
• ${frontOption.name}

🔄 VERSO DA CANECA
• ${backOption.name}
📝 DADOS DA PERSONALIZAÇÃO
• ${dadosText}

☕ MODELO DA CANECA
• Caneca Branca Tradicional

🎁 EMBALAGEM
• ${packaging.name}

📦 ENTREGA OU RETIRADA
• A combinar pelo WhatsApp 📍

💵 VALOR TOTAL (sem entrega)
• R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

━━━━━━━━━━━

Como posso prosseguir com o pagamento e combinar a entrega/retirada? ✨`;

    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedMessage}`;
  };

  return (
    <div id="step-4-container" className="animate-fade-in space-y-5">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5" />
          Embalagem Especial
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
          const pkgPrice = getPackagingPrice(pkg.id, 38.90);
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
                <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md animate-scale-in">
                      <Check className="w-3.5 h-3.5 font-extrabold stroke-[3]" />
                    </div>
                  )}
                  {pkg.id === 'emb_coracao_mdf' && (
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

              {/* Price display with NO "+ Adicional" reference, showing flat full price */}
              <div className="p-2.5 pt-0 border-t border-slate-50 mt-1 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Valor:</span>
                <span className="text-sm font-extrabold text-slate-950 font-sans">
                  R$ {pkgPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live total display box */}
      {selectedPkg ? (
        <div className="bg-red-500 text-white rounded-2xl p-4 shadow-md flex items-center justify-between animate-scale-in">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider opacity-90">Opção Escolhida:</p>
            <p className="text-xs opacity-95 font-bold leading-tight mt-0.5 max-w-[200px]">
              {selectedPkg.name}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-semibold opacity-90">Valor Total</p>
            <p className="text-2xl font-extrabold font-sans leading-none mt-0.5">
              R$ {selectedPkgPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-rose-50/50 text-rose-950 rounded-2xl p-4.5 shadow-xs border border-rose-100 flex flex-col items-center justify-center py-6 text-center space-y-1">
          <p className="text-xs font-extrabold text-rose-800 uppercase tracking-wider">👉 Quase pronto!</p>
          <p className="text-xs font-medium text-slate-500 max-w-[280px]">
            Clique em um das opções acima para confirmar os valores e enviar seu pedido automaticamente para o nosso WhatsApp!
          </p>
        </div>
      )}

      {/* Primary Action Send Order via WhatsApp */}
      {selectedPkg && (
        <div className="pt-4 pb-12">
          <a
            id="btn-whatsapp-send-order"
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-pulse flex items-center justify-center gap-2.5 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-xl hover:scale-[1.01] transition-all uppercase tracking-wide cursor-pointer text-center"
          >
            <MessageSquareText className="w-5 h-5 fill-current" />
            Enviar meu pedido no WhatsApp
          </a>
        </div>
      )}

      {/* Brand Footer */}
      <div className="text-center text-[10px] text-slate-400 font-medium pt-3 pb-8">
        Desenvolvido por <span className="font-bold text-rose-500">Time Imprint</span> • Envios Rápidos 🚀
      </div>

      {/* Sticky Bottom Floating WhatsApp Bar that hides near scroll end */}
      {selectedPkg && showStickyButton && (
        <div 
          className={`fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto z-45 px-4.5 py-4 bg-[#fffdfd]/95 backdrop-blur-md border-t border-rose-100/30 flex items-center justify-center lg:absolute lg:bottom-0 lg:rounded-b-[32px] transition-all duration-300 ${
            showStickyButton ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <a
            id="sticky-btn-whatsapp-send-order"
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-pulse flex items-center justify-center gap-2.5 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-[1.01] transition-all uppercase tracking-wide cursor-pointer text-center"
          >
            <MessageSquareText className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            Enviar meu pedido no WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
