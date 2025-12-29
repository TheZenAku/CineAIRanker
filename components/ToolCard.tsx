
import React from 'react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="glass group relative p-6 rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 mb-6 overflow-hidden">
      {/* Rank Badge */}
      <div className="absolute top-0 right-0 p-4">
        <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">
          #{tool.rank}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {tool.name}
            </h3>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              Grátis / Freemium
            </span>
          </div>
          
          <p className="text-gray-400 mb-4 leading-relaxed">
            {tool.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tool.bestFeatures.map((feature, idx) => (
              <span key={idx} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-300">
                {feature}
              </span>
            ))}
          </div>

          <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl mb-6">
            <p className="text-sm text-indigo-300">
              <span className="font-bold">Acesso:</span> {tool.freeTierInfo}
            </p>
          </div>

          <a 
            href={tool.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 bg-white text-black font-semibold rounded-xl hover:bg-indigo-100 transition-colors"
          >
            Acessar {tool.name}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
