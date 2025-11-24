import React, { useState, useEffect, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PreviewCanvas } from './components/PreviewCanvas';
import { FontFile, FontSettings } from './types';
import { DEFAULT_SETTINGS, SAMPLE_TEXTS } from './constants';

const App: React.FC = () => {
  const [fonts, setFonts] = useState<FontFile[]>([]);
  const [activeFontId, setActiveFontId] = useState<string | null>(null);
  const [settings, setSettings] = useState<FontSettings>(DEFAULT_SETTINGS);
  const [text, setText] = useState<string>(SAMPLE_TEXTS.default);

  const activeFont = fonts.find(f => f.id === activeFontId) || null;

  const handleFileUpload = useCallback(async (files: FileList) => {
    Array.from(files).forEach(async (file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!['ttf', 'woff', 'woff2', 'otf'].includes(extension || '')) return;

      const buffer = await file.arrayBuffer();
      const fontName = `Font_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fontUrl = URL.createObjectURL(new Blob([buffer]));
      
      const fontFace = new FontFace(fontName, `url(${fontUrl})`);
      
      try {
        const loadedFace = await fontFace.load();
        document.fonts.add(loadedFace);
        
        const newFont: FontFile = {
          id: fontName,
          name: file.name.replace(/\.[^/.]+$/, ""), // remove extension
          fileName: file.name,
          format: extension || 'unknown',
          family: fontName,
          url: fontUrl
        };

        setFonts(prev => [...prev, newFont]);
        // Select the newly uploaded font automatically
        setActiveFontId(fontName);
      } catch (err) {
        console.error("Failed to load font:", file.name, err);
        alert(`Failed to load ${file.name}. The file might be corrupted or unsupported.`);
      }
    });
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      fonts.forEach(font => URL.revokeObjectURL(font.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <ControlPanel
        settings={settings}
        onSettingsChange={setSettings}
        fonts={fonts}
        activeFontId={activeFontId}
        onFontSelect={setActiveFontId}
        onFileUpload={handleFileUpload}
        text={text}
        onTextChange={setText}
      />
      <PreviewCanvas
        settings={settings}
        activeFont={activeFont}
        text={text}
        onTextChange={setText}
      />
    </div>
  );
};

export default App;