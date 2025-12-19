"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, RefreshCw, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import SeeAlso from "@/components/ui/SeeAlso";
import { removeBackground } from "@imgly/background-removal";

export default function RemoveBgPage() {
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>();
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Limpeza de memória: Quando o componente desmontar ou a imagem mudar, precisamos revogar a URL para liberar RAM.
  useEffect(() => {
    return () => {
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [originalImageUrl, processedImageUrl]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Criando URL temp para a imagem original
    const objectUrl = URL.createObjectURL(file);
    setOriginalImageUrl(objectUrl);

    // apaga a url da última imagem editada
    setProcessedImageUrl(null);
    setIsProcessing(true);

    try {
      // envia a imagem para o removedor de fundo e retorna a imagem png com fundo removido
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          console.log(`Baixando modelo IA ${key}: ${current} de ${total}`);
        },
      });

      // Transforma a imagem convertida em link e salva no state
      const processedUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(processedUrl);
    } catch (error) {
      console.error("Erro ao remover fundo", error);
      alert("Houve um erro ao processar a imagem. Tente novamente");
    } finally {
      setIsProcessing(false);
    }
  }

  function clearImage() {
    setOriginalImageUrl(null);
    setProcessedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  //   Cria um elemento <a>, atribui o link da imagem editada, adiciona dentro do html, simula o link e depois remove o elemento <a>
  function downloadImage() {
    if (processedImageUrl) {
      const link = document.createElement("a");
      link.href = processedImageUrl;
      link.download = "utly-removed-bg.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

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

      {!originalImageUrl ? (
        /* Estado 1: Área de Upload (Vazio) */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-3xl p-10 bg-slate-50/50 hover:bg-white hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer group mb-10 text-center"
        >
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <UploadCloud className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Solte sua imagem aqui
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            ou clique para navegar nos arquivos
          </p>
          <div className="inline-flex gap-3">
            <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-mono">
              JPG
            </span>
            <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-mono">
              PNG
            </span>
            <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-mono">
              WEBP
            </span>
          </div>
        </div>
      ) : (
        /* Estado 2: Visualização do Resultado */
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />{" "}
                  Processando IA...{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Check className="w-4 h-4 text-green-500" /> Resultado Gerado{" "}
                </>
              )}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="h-8 text-xs px-3"
                onClick={clearImage}
              >
                <RefreshCw className="w-3 h-3" /> Novo Upload
              </Button>
              <Button
                variant="primary"
                className="h-8 text-xs px-3"
                disabled={isProcessing}
                onClick={downloadImage}
              >
                <Download className="w-3 h-3" /> Download
              </Button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm grid md:grid-cols-2">
            {/* Lado Esquerdo: Original (IMAGEM REAL UPLOADADA) */}
            <div className="p-4 border-r border-slate-100 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50 flex items-center justify-center min-h-[300px] relative">
              <span className="absolute top-3 left-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-600 border border-slate-200 z-10">
                ORIGINAL
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalImageUrl}
                alt="Original"
                className="max-h-[300px] max-w-full object-contain"
              />
            </div>

            {/* Lado Direito: Processado (Simulado) */}
            <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-white flex items-center justify-center min-h-[300px] relative">
              <span className="absolute top-3 right-3 bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold border border-green-200 z-10">
                SEM FUNDO
              </span>

              {isProcessing ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                  <span className="text-xs text-slate-400 font-medium">
                    Baixando modelo & Recortando...
                  </span>
                  <span className="text-[10px] text-slate-300 text-center px-4">
                    O primeiro uso pode levar alguns segundos para configurar a
                    IA.
                  </span>{" "}
                </div>
              ) : (
                /* No MVP, mostramos a imagem original com um filtro para simular que algo aconteceu */
                <div className="relative animate-in fade-in duration-500">
                  {processedImageUrl && (
                    <img
                      src={processedImageUrl}
                      alt="Processed Result"
                      className="max-h-[300px] max-w-full object-contain"
                    />
                  )}
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
