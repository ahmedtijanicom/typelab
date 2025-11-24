import { FontSettings } from './types';

export const DEFAULT_SETTINGS: FontSettings = {
  fontSize: 48,
  lineHeight: 1.5,
  letterSpacing: 0,
  wordSpacing: 0,
  weight: 400,
  transform: 'none',
  align: 'left',
  direction: 'ltr',
};

export const SAMPLE_TEXTS = {
  default: "The quick brown fox jumps over the lazy dog.",
  heading: "Sphinx of black quartz, judge my vow.",
  paragraph: "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.",
};

export const ALLOWED_EXTENSIONS = ['.ttf', '.woff', '.woff2', '.otf'];