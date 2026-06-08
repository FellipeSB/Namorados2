/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MugBackOption, VersoType } from '../types';
import { BACK_OPTIONS } from '../data';
import { Calendar, Music, Image as ImageIcon, Sparkles, MessageSquare, Heart } from 'lucide-react';

interface Step2BackProps {
  selectedBackType: VersoType;
  backData: {
    coupleNames?: string;
    anniversaryDate?: string;
    songName?: string;
  };
  onSelectType: (type: VersoType) => void;
  onUpdateData: (data: { coupleNames?: string; anniversaryDate?: string; songName?: string }) => void;
  onNext: () => void;
}

export default function Step2Back({
  selectedBackType,
  backData,
  onSelectType,
  onUpdateData,
  onNext
}: Step2BackProps) {
  // Local state for inputs to allow smooth editing
  const [coupleNames, setCoupleNames] = useState(backData.coupleNames || '');
  const [anniversaryDate, setAnniversaryDate] = useState(backData.anniversaryDate || '');
  const [songName, setSongName] = useState(backData.songName || '');
  const [validationError, setValidationError] = useState('');

  // Sync with prop updates if they happen
  useEffect(() => {
    setCoupleNames(backData.coupleNames || '');
    setAnniversaryDate(backData.anniversaryDate || '');
    setSongName(backData.songName || '');
  }, [backData, selectedBackType]);

  const handleFieldChange = (field: string, val: string) => {
    setValidationError(''); // Clear error
    const updated = {
      coupleNames: field === 'coupleNames' ? val : coupleNames,
      anniversaryDate: field === 'anniversaryDate' ? val : anniversaryDate,
      songName: field === 'songName' ? val : songName
    };

    if (field === 'coupleNames') setCoupleNames(val);
    if (field === 'anniversaryDate') setAnniversaryDate(val);
    if (field === 'songName') setSongName(val);

    onUpdateData(updated);
  };

  const validateAndProceed = () => {
    if (!selectedBackType) {
      setValidationError('Por favor, selecione acima como você quer personalizar o verso da caneca!');
      return;
    }

    if (selectedBackType === 'calendario') {
      if (!anniversaryDate.trim()) {
        setValidationError('Por favor, informe a data de namoro.');
        return;
      }
      if (!coupleNames.trim()) {
        setValidationError('Por favor, informe os nomes do casal.');
        return;
      }
    } else if (selectedBackType === 'spotify') {
      if (!songName.trim()) {
        setValidationError('Por favor, informe o nome da música.');
        return;
      }
      if (!coupleNames.trim()) {
        setValidationError('Por favor, informe os nomes do casal.');
        return;
      }
    } else if (selectedBackType === 'nome') {
      if (!coupleNames.trim()) {
        setValidationError('Por favor, informe os nomes do casal.');
        return;
      }
    }

    // Dismiss soft keyboard & mobile automatic focus zoom if any
    if (document.activeElement && typeof (document.activeElement as any).blur === 'function') {
      (document.activeElement as any).blur();
    }

    setValidationError('');
    onNext();
  };

  // Icon mapping for nice presentation inside categories
  const getBackIcon = (id: VersoType) => {
    switch (id) {
      case 'foto':
        return <ImageIcon className="w-5 h-5 text-pink-600" />;
      case 'spotify':
        return <Music className="w-5 h-5 text-emerald-600" />;
      case 'calendario':
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'nome':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div id="step-2-container" className="animate-fade-in space-y-5">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
          Escolha o verso da caneca
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          Personalize a parte de trás com sua foto, música do casal, calendário ou nomes! ❤️
        </p>
      </div>

      {/* Grid of 4 options (2 by 2) */}
      <div className="grid grid-cols-2 gap-3">
        {BACK_OPTIONS.map((option: MugBackOption) => {
          const isSelected = selectedBackType === option.id;
          return (
            <button
              key={option.id}
              id={`back-option-${option.id}`}
              onClick={() => {
                onSelectType(option.id);
                setValidationError('');
                setTimeout(() => {
                  const el = document.getElementById('custom-form-container');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className={`group flex flex-col items-center bg-white rounded-2xl border-2 text-left p-2.5 overflow-hidden transition-all duration-300 shadow-xs cursor-pointer ${
                isSelected
                  ? 'border-red-500 ring-2 ring-red-100 scale-[1.02] bg-rose-50/10'
                  : 'border-slate-100 hover:border-rose-100'
              }`}
            >
              <div className="relative w-full aspect-video rounded-lg bg-slate-50 overflow-hidden mb-2">
                <img
                  src={option.image}
                  alt={option.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-xs p-1 rounded-full shadow-xs">
                  {getBackIcon(option.id)}
                </div>
              </div>

              <h3 className={`text-xs font-bold leading-tight ${isSelected ? 'text-red-700 font-extrabold' : 'text-slate-800'} text-center mt-1`}>
                {option.name}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Conditional fields form */}
      <div id="custom-form-container" className="scroll-mt-24 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-rose-100/50 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800/80 flex items-center gap-1.5 border-b border-rose-50 pb-2">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          Informações da Personalização
        </h3>

        {!selectedBackType && (
          <div className="text-center py-6 text-slate-400 font-medium text-xs">
            ✨ Selecione um modelo de verso acima para começar a personalizar!
          </div>
        )}

        {/* Warning messages */}
        {(selectedBackType === 'foto' || selectedBackType === 'spotify') && (
          <div className="flex gap-2.5 items-start bg-indigo-50/70 text-indigo-950 p-3 rounded-xl border border-indigo-100/60 text-xs">
            <MessageSquare className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-bold">Aviso sobre fotos:</span> A foto que você quer estampar devera ser enviada diretamente pelo WhatsApp pra gente logo que finalizar o pedido aqui! 🎁
            </p>
          </div>
        )}

        {/* Conditionally rendered fields */}
        {selectedBackType === 'calendario' && (
          <div className="space-y-3">
            <div>
              <label htmlFor="anniversary-date" className="block text-xs font-bold text-slate-700 mb-1">
                Data de Namoro *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="anniversary-date"
                  type="text"
                  placeholder="Ex: 12 de Junho de 2021 ou 12/06/2021"
                  value={anniversaryDate}
                  onChange={(e) => handleFieldChange('anniversaryDate', e.target.value)}
                  className="w-full text-base pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-gray-800"
                />
              </div>
            </div>

            <div>
              <label htmlFor="couple-names-calendar" className="block text-xs font-bold text-slate-700 mb-1">
                Nomes do Casal *
              </label>
              <input
                id="couple-names-calendar"
                type="text"
                placeholder="Ex: Carlos & Sofia"
                value={coupleNames}
                onChange={(e) => handleFieldChange('coupleNames', e.target.value)}
                className="w-full text-base px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-gray-800"
              />
            </div>
          </div>
        )}

        {selectedBackType === 'spotify' && (
          <div className="space-y-3">
            <div>
              <label htmlFor="song-name" className="block text-xs font-bold text-slate-700 mb-1">
                Nome da Música e Artista *
              </label>
              <div className="relative">
                <Music className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="song-name"
                  type="text"
                  placeholder="Ex: Perfect - Ed Sheeran"
                  value={songName}
                  onChange={(e) => handleFieldChange('songName', e.target.value)}
                  className="w-full text-base pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-gray-800"
                />
              </div>
            </div>

            <div>
              <label htmlFor="couple-names-spotify" className="block text-xs font-bold text-slate-700 mb-1">
                Nomes do Casal *
              </label>
              <input
                id="couple-names-spotify"
                type="text"
                placeholder="Ex: Carlos & Sofia"
                value={coupleNames}
                onChange={(e) => handleFieldChange('coupleNames', e.target.value)}
                className="w-full text-base px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-gray-800"
              />
            </div>
          </div>
        )}

        {selectedBackType === 'foto' && (
          <div className="space-y-3">
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Nenhum campo de texto adicional é obrigatório para este verso de foto. Basta clicar em Próximo!</p>
          </div>
        )}

        {selectedBackType === 'nome' && (
          <div className="space-y-3">
            <div>
              <label htmlFor="couple-names-text" className="block text-xs font-bold text-slate-700 mb-1">
                Nomes do Casal *
              </label>
              <input
                id="couple-names-text"
                type="text"
                placeholder="Ex: Carlos & Sofia"
                value={coupleNames}
                onChange={(e) => handleFieldChange('coupleNames', e.target.value)}
                className="w-full text-base px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-gray-800"
              />
            </div>
          </div>
        )}

        {validationError && (
          <span className="block text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-lg border border-red-100 animate-pulse">
            ⚠️ {validationError}
          </span>
        )}
      </div>

      {/* Manual Button Action trigger */}
      <div className="flex justify-end pt-1">
        <button
          id="btn-validate-proceed-step-2"
          onClick={validateAndProceed}
          className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl shadow-md transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          Confirmar Verso e Avançar
        </button>
      </div>
    </div>
  );
}
