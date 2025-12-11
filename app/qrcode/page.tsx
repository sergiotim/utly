"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Download, UploadCloud, Check, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { InputGroup } from '@/components/ui/InputGroup';
// import SeeAlso from '@/components/ui/SeeAlso'; // Vamos criar esse componente no final

export default function QrCodePage() {
  const [qrValue, setQrValue] = useState('https://utly.com');
  const [debouncedValue, setDebouncedValue] = useState('https://utly.com');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState<string | null>(null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(qrValue || 'https://utly.com'); }, 500);
    return () => clearTimeout(handler);
  }, [qrValue]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const cleanColor = (color: string) => color.replace('#', '');
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(debouncedValue)}&color=${cleanColor(fgColor)}&bgcolor=${cleanColor(bgColor)}&margin=15&qzone=1&format=svg`;

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
           <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">QR Code Studio</h1>
            <p className="text-slate-500">Personalize cada detalhe do seu código.</p>
          </header>
          {/* ... Copie o resto do conteúdo do QR Code (inputs) do seu código original aqui ... */}
          {/* Vou abreviar os inputs para caber na resposta, mas você cola o código completo aqui */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
             <InputGroup label="Conteúdo / URL">
               <input type="text" value={qrValue} onChange={(e) => setQrValue(e.target.value)} placeholder="https://exemplo.com" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
             </InputGroup>
             <div className="grid sm:grid-cols-2 gap-6">
                <InputGroup label="Cores">
                    <div className="flex gap-3">
                         <div className="relative h-10 w-full bg-slate-50 border border-slate-200 rounded-lg flex items-center px-2 cursor-pointer overflow-hidden">
                            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="w-6 h-6 rounded border border-slate-200 mr-2 shadow-sm" style={{ backgroundColor: fgColor }}></div>
                            <span className="text-xs text-slate-500 font-medium">Conteúdo</span>
                         </div>
                         <div className="relative h-10 w-full bg-slate-50 border border-slate-200 rounded-lg flex items-center px-2 cursor-pointer overflow-hidden">
                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="w-6 h-6 rounded border border-slate-200 mr-2 shadow-sm" style={{ backgroundColor: bgColor }}></div>
                            <span className="text-xs text-slate-500 font-medium">Fundo</span>
                         </div>
                    </div>
                </InputGroup>
                <InputGroup label="Logo (Opcional)">
                    <input type="file" ref={logoInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                    {logo ? (
                        <div className="flex items-center gap-2 h-10">
                            <div className="flex-1 flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1 text-indigo-700 text-xs font-medium"><Check className="w-3 h-3" /> Carregado</div>
                            <button onClick={removeLogo} className="h-10 w-10 flex items-center justify-center bg-red-50 border border-red-200 text-red-500 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    ) : (
                        <button onClick={() => logoInputRef.current?.click()} className="w-full h-10 border border-dashed border-slate-300 rounded-lg text-slate-500 text-xs font-medium hover:bg-slate-50 flex items-center justify-center gap-2"><UploadCloud className="w-4 h-4" /> Upload</button>
                    )}
                </InputGroup>
             </div>
           </div>
        </div>

        <div className="lg:col-span-5">
           <div className="sticky top-24 space-y-4">
             <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="relative bg-white p-4 rounded-xl shadow-lg z-10">
                   <img src={qrApiUrl} alt="QR Code Preview" className="w-48 h-48 object-contain" />
                   {logo && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="bg-white p-1 rounded-full shadow-md"><img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-full" /></div></div>}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 w-full relative z-10">
                    <Button variant="primary" className="w-full" onClick={() => window.open(qrApiUrl.replace('svg', 'png') + '&download=1', '_blank')}><Download className="w-4 h-4" /> PNG</Button>
                    <Button variant="secondary" className="w-full bg-transparent text-white border-slate-700 hover:bg-slate-800 hover:text-white" onClick={() => window.open(qrApiUrl, '_blank')}><Download className="w-4 h-4" /> SVG</Button>
                </div>
             </div>
           </div>
        </div>
      </div>
      {/* <SeeAlso current="qrcode" /> */}
    </div>
  );
}