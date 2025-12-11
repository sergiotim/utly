"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, Download, RefreshCw, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import SeeAlso from '@/components/ui/SeeAlso';

export default function RemoveBgPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        // Simular um tempo de "processamento" da IA
        setTimeout(() => setIsProcessing(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-32">
      <header className="mb-8 text-center lg:text-left">
        <h1 className="text-2xl font-bold text-slate-900">Magic Eraser</h1>
        <p className="text-slate-500">IA avançada para recorte de imagens.</p>
      </header>

      {/* Input Oculto */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      {!uploadedImage ? (
        /* Estado 1: Área de Upload (Vazio) */
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-3xl p-10 bg-slate-50/50 hover:bg-white hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer group mb-10 text-center"
        >
           <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
             <UploadCloud className="w-10 h-10 text-indigo-500" />
           </div>
           <h3 className="text-lg font-bold text-slate-900 mb-2">Solte sua imagem aqui</h3>
           <p className="text-slate-500 text-sm mb-6">ou clique para navegar nos arquivos</p>
           <div className="inline-flex gap-3">
              <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-mono">JPG</span>
              <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-mono">PNG</span>
              <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-mono">WEBP</span>
           </div>
        </div>
      ) : (
        /* Estado 2: Visualização do Resultado */
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                {isProcessing ? (
                   <> <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" /> Processando IA... </>
                ) : (
                   <> <Check className="w-4 h-4 text-green-500" /> Resultado Gerado </>
                )}
             </h3>
             <div className="flex gap-2">
                <Button variant="secondary" className="h-8 text-xs px-3" onClick={clearImage}>
                   <RefreshCw className="w-3 h-3" /> Novo Upload
                </Button>
                <Button variant="primary" className="h-8 text-xs px-3" disabled={isProcessing}>
                   <Download className="w-3 h-3" /> Baixar HD
                </Button>
             </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm grid md:grid-cols-2">
             {/* Lado Esquerdo: Original (IMAGEM REAL UPLOADADA) */}
             <div className="p-4 border-r border-slate-100 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50 flex items-center justify-center min-h-[300px] relative">
                <span className="absolute top-3 left-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-600 border border-slate-200 z-10">ORIGINAL</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={uploadedImage} 
                  alt="Original" 
                  className="max-h-[300px] max-w-full object-contain"
                />
             </div>
             
             {/* Lado Direito: Processado (Simulado) */}
             <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-white flex items-center justify-center min-h-[300px] relative">
                <span className="absolute top-3 right-3 bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold border border-green-200 z-10">SEM FUNDO</span>
                
                {isProcessing ? (
                   <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                      <span className="text-xs text-slate-400 font-medium">Recortando objeto...</span>
                   </div>
                ) : (
                   /* No MVP, mostramos a imagem original com um filtro para simular que algo aconteceu */
                   <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={uploadedImage} 
                        alt="Processed Placeholder" 
                        className="max-h-[300px] max-w-full object-contain opacity-80 mix-blend-multiply grayscale" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">Simulação de Recorte</span>
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>
      )}
      
      <SeeAlso current="remove-bg" />
    </div>
  );
}