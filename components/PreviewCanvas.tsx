import React, { useState } from 'react';
import { FontFile, FontSettings } from '../types';

interface PreviewCanvasProps {
  settings: FontSettings;
  activeFont: FontFile | null;
  text: string;
  onTextChange: (text: string) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  settings,
  activeFont,
  text,
  onTextChange
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const style = {
    fontFamily: activeFont ? `"${activeFont.family}"` : 'sans-serif',
    fontSize: `${settings.fontSize}px`,
    lineHeight: settings.lineHeight,
    letterSpacing: `${settings.letterSpacing}px`,
    wordSpacing: `${settings.wordSpacing}px`,
    fontWeight: settings.weight,
    textTransform: settings.transform,
    textAlign: settings.align,
    direction: settings.direction,
  } as React.CSSProperties;

  return (
    <main className={`flex-1 h-screen flex flex-col relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <button
          onClick={() => setIsDarkMode(false)}
          className={`p-2 rounded-full transition-all ${!isDarkMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
          title="Light Mode"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        </button>
        <button
          onClick={() => setIsDarkMode(true)}
          className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          title="Dark Mode"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-8 md:p-16 flex items-center justify-center min-h-[50vh]">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          style={style}
          dir={settings.direction}
          className="w-full h-full bg-transparent resize-none outline-none border-none placeholder-gray-500/30"
          placeholder="Type something amazing..."
          spellCheck={false}
        />
      </div>

      {/* Info Footer */}
      <div className="px-6 py-3 border-t border-gray-200/10 text-xs text-gray-500 flex justify-between items-center backdrop-blur-sm bg-white/5">
        <div className="font-mono">
          {activeFont ? activeFont.fileName : 'System Sans Serif'} 
          {activeFont && <span className="ml-2 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">{activeFont.format}</span>}
        </div>
        <div className="font-mono opacity-50">
          Glyphs: {text.length} | Words: {text.split(/\s+/).filter(w => w.length > 0).length} | {settings.direction.toUpperCase()}
        </div>
      </div>
    </main>
  );
};