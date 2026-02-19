import React from 'react';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

interface CodePanelProps {
  code: string;
}

export function CodePanel({ code }: CodePanelProps) {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-border/20">
      <div className="h-9 flex items-center px-4 border-b border-white/10 bg-[#1e1e1e] text-[#cccccc]">
        <span className="text-xs font-mono">GeneratedComponent.tsx</span>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar font-mono text-sm relative">
        <Editor
          value={code}
          onValueChange={() => {}} // Read only for now
          highlight={code => Prism.highlight(code, Prism.languages.jsx || Prism.languages.js, 'jsx')}
          padding={16}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            backgroundColor: '#1e1e1e',
            minHeight: '100%',
          }}
          className="min-h-full"
          textareaClassName="focus:outline-none"
        />
        {!code && (
           <div className="absolute inset-0 flex items-center justify-center text-white/20 pointer-events-none">
             // Waiting for generation...
           </div>
        )}
      </div>
    </div>
  );
}
