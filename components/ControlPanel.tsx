import React, { useRef } from 'react';
import { FontFile, FontSettings } from '../types';
import { Slider } from './Slider';
import { ALLOWED_EXTENSIONS } from '../constants';

interface ControlPanelProps {
  settings: FontSettings;
  onSettingsChange: (settings: FontSettings) => void;
  fonts: FontFile[];
  activeFontId: string | null;
  onFontSelect: (id: string) => void;
  onFileUpload: (files: FileList) => void;
  text: string;
  onTextChange: (text: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onSettingsChange,
  fonts,
  activeFontId,
  onFontSelect,
  onFileUpload,
  text,
  onTextChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeFont = fonts.find(f => f.id === activeFontId);

  const updateSetting = (key: keyof FontSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const transformOptions = [
    { value: 'none', label: 'None', preview: 'Ag' },
    { value: 'uppercase', label: 'Upper', preview: 'AA' },
    { value: 'lowercase', label: 'Lower', preview: 'aa' },
    { value: 'capitalize', label: 'Cap', preview: 'Aa' },
  ];

  return (
    <aside className="w-full md:w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto flex flex-col shadow-xl z-20">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur z-10">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
          TypeLab AI
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Upload and test fonts in real-time.
        </p>
      </div>

      {/* Font Upload & Selection */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Font Selection</h2>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={ALLOWED_EXTENSIONS.join(',')}
          multiple
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium transition-colors flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Fonts
        </button>

        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {fonts.length === 0 ? (
            <div className="text-sm text-gray-400 italic text-center py-2">No fonts uploaded</div>
          ) : (
            fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => onFontSelect(font.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm truncate transition-all ${
                  activeFontId === font.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-blue-500/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {font.name} <span className="text-xs opacity-50 ml-1">.{font.format}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Font Information Section (Replaces Font Formation) */}
      {activeFont && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 space-y-3 bg-blue-50/50 dark:bg-blue-900/10">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Font Information
            </h2>
            <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Family Name</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[150px]" title={activeFont.name}>{activeFont.name}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">File Name</span>
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[150px] font-mono" title={activeFont.fileName}>{activeFont.fileName}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Format</span>
                    <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 uppercase">{activeFont.format}</span>
                 </div>
            </div>
        </div>
      )}

      <div className="flex-1">
        {/* Properties Section - Now includes all formatting controls */}
        <div className="p-6 space-y-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Properties</h2>
          
          <Slider
            label="Size"
            value={settings.fontSize}
            min={8}
            max={200}
            step={1}
            unit="px"
            onChange={(v) => updateSetting('fontSize', v)}
          />
          
          <Slider
            label="Weight"
            value={settings.weight}
            min={100}
            max={900}
            step={100}
            onChange={(v) => updateSetting('weight', v)}
          />

          <Slider
            label="Line Height"
            value={settings.lineHeight}
            min={0.8}
            max={3}
            step={0.05}
            onChange={(v) => updateSetting('lineHeight', v)}
          />

          <Slider
            label="Letter Spacing"
            value={settings.letterSpacing}
            min={-10}
            max={20}
            step={0.1}
            unit="px"
            onChange={(v) => updateSetting('letterSpacing', v)}
          />

           <Slider
            label="Word Spacing"
            value={settings.wordSpacing}
            min={-5}
            max={50}
            step={1}
            unit="px"
            onChange={(v) => updateSetting('wordSpacing', v)}
          />

          {/* Transform Controls */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Transform</label>
            <div className="grid grid-cols-4 gap-2">
               {transformOptions.map((opt) => (
                 <button
                    key={opt.value}
                    onClick={() => updateSetting('transform', opt.value as any)}
                    className={`py-2 px-1 rounded-md text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                      settings.transform === opt.value
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 ring-1 ring-blue-500/20'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                 >
                   <span className="text-[10px] opacity-60 uppercase">{opt.label}</span>
                   <span className="font-serif text-sm">{opt.preview}</span>
                 </button>
               ))}
            </div>
          </div>

          {/* Direction Control */}
          <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Direction</label>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <button
                      onClick={() => updateSetting('direction', 'ltr')}
                      className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${settings.direction === 'ltr' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                      LTR
                  </button>
                  <button
                      onClick={() => updateSetting('direction', 'rtl')}
                      className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${settings.direction === 'rtl' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                      RTL
                  </button>
              </div>
          </div>

          {/* Align Control */}
          <div className="flex gap-2">
              {['left', 'center', 'right', 'justify'].map((align) => (
                  <button 
                      key={align}
                      onClick={() => updateSetting('align', align as any)}
                      className={`p-2 rounded flex-1 flex justify-center items-center transition-colors ${settings.align === align ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title={`Align ${align.charAt(0).toUpperCase() + align.slice(1)}`}
                  >
                      {align === 'left' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" /></svg>}
                      {align === 'center' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" /></svg>}
                      {align === 'right' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" /></svg>}
                      {align === 'justify' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
                  </button>
              ))}
          </div>
        </div>

        {/* Custom Text Input */}
        <div className="p-6">
             <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Custom Text</h2>
             <textarea
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                className="w-full h-32 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-md border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 transition-colors resize-none placeholder-gray-400"
                placeholder="Type here to update the preview..."
             />
        </div>
      </div>
    </aside>
  );
};