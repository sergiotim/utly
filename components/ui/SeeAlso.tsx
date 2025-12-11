import Link from 'next/link';
import { QrCode, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { AdSlot } from './AdSlot';

export default function SeeAlso({ current }: { current: string }) {
  const tools = [
    { id: 'qrcode', name: 'QR Code Studio', icon: QrCode, color: 'text-indigo-600', href: '/qrcode' },
    { id: 'remove-bg', name: 'Magic Eraser', icon: ImageIcon, color: 'text-purple-600', href: '/remove-bg' },
    { id: 'shortener', name: 'Encurtador', icon: LinkIcon, color: 'text-emerald-600', href: '/shortener' },
  ];

  return (
    <div className="mt-8 max-w-5xl mx-auto mb-24">
      <div className="border-t border-slate-100 pt-10">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Veja também</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          {tools.filter(t => t.id !== current).map(tool => (
            <Link 
              key={tool.id}
              href={tool.href}
              className="p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-3 group"
            >
               <div className="p-2 bg-white border border-slate-100 rounded-lg group-hover:scale-105 transition-transform">
                  <tool.icon className={`w-4 h-4 ${tool.color}`} />
               </div>
               <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 capitalize">
                  {tool.name}
               </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10">
         <AdSlot label="Horizontal Banner (728x90)" className="h-24 w-full" />
      </div>
    </div>
  );
}