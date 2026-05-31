"use client";
import React, { useState, useRef, useEffect } from "react";
import { 
  Dices, Users, Shuffle, UploadCloud, 
  RotateCcw, History, Trash2, Calendar, Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";
import SeeAlso from "@/components/ui/SeeAlso";

type Mode = "numbers" | "names" | "teams";

export default function SorteadorPage() {
  const [mode, setMode] = useState<Mode>("numbers");
  const [isDrawing, setIsDrawing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [useCountdown, setUseCountdown] = useState(true);
  
  // Results State
  const [results, setResults] = useState<any[] | null>(null);
  const [metadata, setMetadata] = useState<{
    date: string;
    timezone: string;
    drawnCount: number;
    poolCount: number;
  } | null>(null);

  // --- NUMBERS STATE ---
  const [numMin, setNumMin] = useState<number>(1);
  const [numMax, setNumMax] = useState<number>(100);
  const [numCount, setNumCount] = useState<number>(1);
  const [numAllowRepeat, setNumAllowRepeat] = useState<boolean>(false);
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  
  // --- NAMES & TEAMS STATE ---
  const [namesText, setNamesText] = useState("");
  const [namesCount, setNamesCount] = useState<number>(1);
  const [teamsCount, setTeamsCount] = useState<number>(2);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Helpers
  const parseNames = (text: string) => {
    return text.split(/[\n,]+/).map(n => n.trim()).filter(n => n.length > 0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        // Append text
        setNamesText(prev => prev ? `${prev}\n${text}` : text);
      };
      reader.readAsText(file);
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateDraw = () => {
    setErrorMsg("");
    if (mode === "numbers") {
      if (numMin >= numMax) return "O valor máximo deve ser maior que o mínimo.";
      if (!numAllowRepeat) {
        const poolSize = (numMax - numMin) + 1 - usedNumbers.length;
        if (numCount > poolSize) return `Impossível sortear ${numCount} números únicos. Restam ${poolSize} opções disponíveis no intervalo.`;
      }
      if (numCount < 1) return "Sorteie pelo menos 1 número.";
    }

    if (mode === "names") {
      const pool = parseNames(namesText);
      if (pool.length === 0) return "Insira pelo menos um nome.";
      if (namesCount > pool.length) return "A quantidade a sortear é maior que os nomes disponíveis.";
      if (namesCount < 1) return "Sorteie pelo menos 1 nome.";
    }

    if (mode === "teams") {
      const pool = parseNames(namesText);
      if (pool.length === 0) return "Insira participantes para dividir em equipes.";
      if (teamsCount > pool.length) return "O número de equipes não pode ser maior que o número de participantes.";
      if (teamsCount < 2) return "Crie pelo menos 2 equipes.";
    }

    return null;
  };

  const startDraw = () => {
    const err = validateDraw();
    if (err) {
      setErrorMsg(err);
      return;
    }

    setResults(null);
    setMetadata(null);

    if (useCountdown) {
      setIsDrawing(true);
      setCountdown(5);
    } else {
      executeDraw();
    }
  };

  const startNewDraw = () => {
    // Limpa o histórico de números usados quando é um sorteio completamente novo
    if (mode === "numbers") {
       setUsedNumbers([]);
    }
    startDraw();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDrawing && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isDrawing && countdown === 0) {
      executeDraw();
    }
    return () => clearTimeout(timer);
  }, [isDrawing, countdown]);

  const executeDraw = () => {
    let finalResults: any[] = [];
    let poolSize = 0;

    if (mode === "numbers") {
      poolSize = (numMax - numMin) + 1;
      if (numAllowRepeat) {
        for (let i = 0; i < numCount; i++) {
          finalResults.push(Math.floor(Math.random() * poolSize) + numMin);
        }
      } else {
        const pool = Array.from({ length: poolSize }, (_, i) => i + numMin).filter(n => !usedNumbers.includes(n));
        poolSize = pool.length; // Atualiza o tamanho do pool para o total de números restantes
        for (let i = 0; i < numCount; i++) {
          const idx = Math.floor(Math.random() * pool.length);
          finalResults.push(pool.splice(idx, 1)[0]);
        }
      }
    } else if (mode === "names") {
      const pool = parseNames(namesText);
      poolSize = pool.length;
      let available = [...pool];
      for (let i = 0; i < namesCount; i++) {
        const idx = Math.floor(Math.random() * available.length);
        finalResults.push(available.splice(idx, 1)[0]);
      }
    } else if (mode === "teams") {
      const pool = parseNames(namesText);
      poolSize = pool.length;
      let shuffled = [...pool].sort(() => 0.5 - Math.random());
      
      // Initialize teams array of arrays
      finalResults = Array.from({ length: teamsCount }, () => []);
      
      // Distribute evenly
      shuffled.forEach((person, index) => {
        finalResults[index % teamsCount].push(person);
      });
    }

    setResults(finalResults);
    
    // Metadata
    const now = new Date();
    setMetadata({
      date: now.toLocaleString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      drawnCount: mode === 'teams' ? poolSize : (mode === 'numbers' ? numCount : namesCount),
      poolCount: poolSize
    });

    setIsDrawing(false);
  };

  const handleDrawAgainWithoutRepeats = () => {
    if (mode === "numbers" && results) {
      if(numAllowRepeat) {
         setErrorMsg("Para não repetir, a opção 'Permitir repetição' deve estar desmarcada.");
         return;
      }
      
      const newlyUsed = [...usedNumbers, ...results];
      setUsedNumbers(newlyUsed);
      
      const totalPossible = (numMax - numMin) + 1;
      const remaining = totalPossible - newlyUsed.length;
      
      if(remaining < numCount) {
         setErrorMsg(`Restam apenas ${remaining} números. Ajuste a quantidade a sortear ou limpe o histórico refazendo o sorteio.`);
         setResults(null);
         return;
      }
      
      startDraw();
    } else if (mode === "names" && results) {
       const currentPool = parseNames(namesText);
       const remainingPool = currentPool.filter(n => !results.includes(n));
       setNamesText(remainingPool.join('\n'));
       
       if(remainingPool.length < namesCount) {
          setErrorMsg(`Restam apenas ${remainingPool.length} itens. Ajuste a quantidade a sortear.`);
          setResults(null);
          return;
       }
       startDraw();
    }
  };

  const resetAll = () => {
    setResults(null);
    setMetadata(null);
    setNamesText("");
    setNumMin(1);
    setNumMax(100);
    setNumCount(1);
    setNumAllowRepeat(false);
    setUsedNumbers([]);
    setErrorMsg("");
  };


  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* LADO ESQUERDO: Configurações */}
        <div className="lg:col-span-6 space-y-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Sorteador Aleatório
            </h1>
            <p className="text-slate-500">
              Sorteie números, nomes ou divida equipes facilmente.
            </p>
          </header>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            {/* TABS */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setMode("numbers")}
                className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${mode === "numbers" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                <Dices className="w-4 h-4" /> Números
              </button>
              <button 
                onClick={() => setMode("names")}
                className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${mode === "names" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                <Shuffle className="w-4 h-4" /> Nomes
              </button>
              <button 
                onClick={() => setMode("teams")}
                className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${mode === "teams" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                <Users className="w-4 h-4" /> Equipes
              </button>
            </div>

            {/* ERROR MESSAGE */}
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {errorMsg}
              </div>
            )}

            {/* CONFIGS: NUMBERS */}
            {mode === "numbers" && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="grid grid-cols-2 gap-4">
                   <InputGroup label="Mínimo">
                    <input type="number" value={numMin} onChange={(e) => setNumMin(Number(e.target.value))} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                   </InputGroup>
                   <InputGroup label="Máximo">
                    <input type="number" value={numMax} onChange={(e) => setNumMax(Number(e.target.value))} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                   </InputGroup>
                </div>
                <InputGroup label="Quantidade a sortear">
                  <input type="number" min="1" value={numCount} onChange={(e) => setNumCount(Number(e.target.value))} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </InputGroup>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={numAllowRepeat} onChange={(e) => setNumAllowRepeat(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                  <span className="text-slate-700 text-sm group-hover:text-slate-900">Permitir repetição de números</span>
                </label>
              </div>
            )}

            {/* CONFIGS: NAMES & TEAMS */}
            {(mode === "names" || mode === "teams") && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <InputGroup label={mode === "teams" ? "Participantes" : "Opções / Nomes"}>
                   <p className="text-xs text-slate-500 mb-2">Separe por vírgula ou quebra de linha.</p>
                   <textarea 
                     value={namesText}
                     onChange={(e) => setNamesText(e.target.value)}
                     rows={6}
                     className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                     placeholder="João, Maria, Carlos..."
                   />
                </InputGroup>
                
                <div className="flex items-center gap-4">
                  <input type="file" accept=".txt,.csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg">
                    <UploadCloud className="w-4 h-4" /> Importar TXT / CSV
                  </button>
                  <button onClick={() => setNamesText("")} className="text-sm text-slate-400 hover:text-red-500">
                     Limpar lista
                  </button>
                </div>

                <InputGroup label={mode === "teams" ? "Número de Equipes" : "Quantidade a sortear"}>
                  <input 
                    type="number" min="1" 
                    value={mode === "teams" ? teamsCount : namesCount} 
                    onChange={(e) => mode === "teams" ? setTeamsCount(Number(e.target.value)) : setNamesCount(Number(e.target.value))} 
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </InputGroup>
              </div>
            )}

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={useCountdown} onChange={(e) => setUseCountdown(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                <span className="text-slate-700 text-sm group-hover:text-slate-900">Exibir contagem regressiva animada</span>
              </label>
            </div>

            <Button variant="primary" className="w-full py-4 text-base" onClick={startNewDraw} disabled={isDrawing}>
              {isDrawing ? "Preparando..." : "Realizar Sorteio"}
            </Button>
          </div>
        </div>

        {/* LADO DIREITO: Resultados */}
        <div className="lg:col-span-6">
          <div className="sticky top-24">
            <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
              
              {!isDrawing && !results && (
                <div className="text-slate-400 space-y-4 animate-in fade-in">
                  <Dices className="w-16 h-16 mx-auto opacity-20" />
                  <p className="text-lg">Pronto para sortear.</p>
                  <p className="text-sm opacity-60">Configure ao lado e clique em sortear.</p>
                </div>
              )}

              {isDrawing && (
                <div className="animate-in zoom-in duration-300">
                  <span className="text-8xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse">
                    {countdown}
                  </span>
                </div>
              )}

              {!isDrawing && results && (
                <div className="w-full h-full flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-500">
                  {metadata && (
                    <div className="bg-slate-800/50 p-4 rounded-xl mb-6 border border-slate-700 text-left">
                       <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-2">
                         <Check className="w-4 h-4" /> Sorteio realizado com sucesso
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 mt-3">
                         <div>
                           <span className="block text-slate-500 mb-1">Data e Hora</span>
                           <span className="text-slate-300 flex items-center gap-1"><Calendar className="w-3 h-3"/> {metadata.date}</span>
                         </div>
                         <div>
                           <span className="block text-slate-500 mb-1">Fuso Horário</span>
                           <span className="text-slate-300">{metadata.timezone}</span>
                         </div>
                         <div className="col-span-2 pt-2 border-t border-slate-700 mt-1">
                           <span className="text-slate-300">
                             Sorteado(s) <strong className="text-white">{metadata.drawnCount}</strong> item(s) de um total de <strong className="text-white">{metadata.poolCount}</strong> opções.
                           </span>
                         </div>
                       </div>
                    </div>
                  )}

                  <div className="flex-1 max-h-[400px] overflow-y-auto w-full custom-scrollbar pr-2 mb-6 space-y-3">
                    {mode !== "teams" ? (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {results.map((r, i) => (
                          <div key={i} className="bg-white text-slate-900 font-bold text-2xl px-6 py-4 rounded-xl shadow-lg border-2 border-indigo-500 animate-in zoom-in" style={{animationDelay: `${i * 100}ms`}}>
                            {r}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.map((team, i) => (
                          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-left">
                             <h4 className="text-indigo-400 font-bold mb-3 border-b border-slate-700 pb-2">Equipe {i + 1}</h4>
                             <ul className="space-y-1">
                               {team.map((member: string, j: number) => (
                                 <li key={j} className="text-slate-300 text-sm flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div> {member}
                                 </li>
                               ))}
                             </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`grid grid-cols-1 ${(mode === 'names' || mode === 'numbers') ? 'sm:grid-cols-2' : 'sm:grid-cols-1'} gap-3 w-full mt-auto`}>
                    {(mode === 'names' || mode === 'numbers') && (
                      <Button variant="secondary" className="w-full bg-transparent  border-slate-700 hover:bg-slate-800 hover:text-white" onClick={handleDrawAgainWithoutRepeats}>
                        Refazer (Sem repetidos)
                      </Button>
                    )}
                    <Button variant="primary" className="w-full text-xs px-4" onClick={startNewDraw}>
                      <RotateCcw className="w-3 h-3" /> Refazer Sorteio
                    </Button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      <SeeAlso current="sorteador" />
    </div>
  );
}
