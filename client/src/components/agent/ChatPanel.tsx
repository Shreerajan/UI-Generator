import React, { useState } from 'react';
import { Send, RotateCcw, Play, RefreshCw, Wand2 } from 'lucide-react';

interface ChatPanelProps {
  onGenerate: (prompt: string) => void;
  onReset: () => void;
  explanation: string;
  isGenerating: boolean;
}

export function ChatPanel({ onGenerate, onReset, explanation, isGenerating }: ChatPanelProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onGenerate(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-border">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-mono font-bold flex items-center gap-2 text-foreground">
          <Wand2 className="w-5 h-5 text-primary" />
          UI Generator
        </h1>
        <div className="text-xs text-muted-foreground mt-1 font-mono">v1.0.0 (Deterministic)</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {explanation ? (
          <div className="bg-card border border-border p-4 rounded-md shadow-sm">
            <h3 className="text-sm font-semibold text-primary mb-2 font-mono uppercase tracking-wider">Agent Reasoning</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{explanation}</p>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <p className="text-sm">Enter a prompt to generate a UI.</p>
            <p className="text-xs mt-2 opacity-50">Try "Create a dashboard with charts" or "Login screen"</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-sidebar">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your UI (e.g. 'Login form with email and password')..."
            className="w-full h-24 bg-input border border-border rounded-md p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none font-mono"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex gap-2">
            <button 
              type="submit" 
              disabled={isGenerating || !input.trim()}
              className="flex-1 bg-primary text-primary-foreground hover:bg-blue-600 h-9 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Generate
            </button>
            <button 
              type="button" 
              onClick={onReset}
              className="h-9 px-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md border border-border flex items-center justify-center"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
