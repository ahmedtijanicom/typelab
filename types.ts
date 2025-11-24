export interface FontFile {
  id: string;
  name: string;
  fileName: string;
  format: string;
  family: string;
  url: string;
}

export interface FontSettings {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  weight: number;
  transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  align: 'left' | 'center' | 'right' | 'justify';
  direction: 'ltr' | 'rtl';
}

export enum SampleTextType {
  PANGRAM = 'Pangrams',
  STORY = 'Story',
  TECHNICAL = 'Technical',
  POETRY = 'Poetry',
  NUMBERS = 'Numbers & Symbols',
  ARABIC = 'Arabic Content'
}