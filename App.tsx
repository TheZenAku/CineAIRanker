
import React, { useState, useEffect, useCallback } from 'react';
import { RankingState } from './types';
import { fetchLatestAIRanking } from './services/geminiService';
import ToolCard from './components/ToolCard';

const App: React.FC = () => {
  const [state, setState] = useState<RankingState>({
    tools: [],
    sources: [],
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const loadRanking = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchLatestAIRanking();
      setState({
        tools: data.tools,
        sources: data.sources,
        isLoading: false,
        error: null,
        lastUpdated: new Date().toLocaleTimeString('pt-BR'),
      });
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'Erro ao atualizar dados.' 
      }));
    }
  }, []);

  useEffect(() => {
    loadRanking();
  }, [loadRanking]);

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30">
      {/* Decorative Blobs */}
      <div className="floating-blob top-[10%] left-[10%]" />
      <div className="floating-blob bottom-[10%] right-[10%] bg-blue-600" />
      
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">C</div>
            <h1 className="text-xl font-bold tracking-tight">CineAI<span className="text-indigo-400">Ranker</span></h1>
          </div>
          <button 
            onClick={loadRanking}
            disabled={state.isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              state.isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
            }`}
          >
            <svg className={`w-4 h-4 ${state.isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {state.isLoading ? 'Atualizando...' : 'Atualizar Agora'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Crie Cinema com <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Inteligência Artificial
          </span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          As melhores ferramentas gratuitas para transformar texto em vídeos épicos. 
          Ranking atualizado em tempo real via pesquisa avançada.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        {state.error && (
          <div className="p-4 mb-8 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-center">
            {state.error}
          </div>
        )}

        {state.isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass h-64 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {state.tools.map((tool) => (
              <ToolCard key={tool.rank} tool={tool} />
            ))}
          </div>
        )}

        {/* Sources & Grounding */}
        {!state.isLoading && state.sources.length > 0 && (
          <div className="mt-16 p-8 glass rounded-3xl">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM15 10a5 5 0 11-10 0 5 5 0 0110 0z" />
              </svg>
              Fontes Consultadas via Google Search
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-indigo-300 flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-all"
                >
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  <span className="truncate">{source.title || source.uri}</span>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500 text-center italic">
              Última atualização: {state.lastUpdated}
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-10 text-center text-gray-600 text-sm">
        <p>© 2024 CineAI Ranker - Explore as fronteiras da criação visual.</p>
      </footer>
    </div>
  );
};

export default App;
