export type TShirtColor = 'white' | 'black' | 'navy' | 'gray' | 'red';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';
export type PrintSize = 'A4' | 'A3' | 'A2';
export type TShirtView = 'front' | 'back' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface PrintSizeConstraints {
  width: number;
  height: number;
  label: string;
  price: number;
}

export interface Design {
  id: string;
  url: string;
  position: Position;
  rotation: number;
  scale: number;
  layer: number;
  view: TShirtView;
}

export interface DesignHistory {
  past: Design[][];
  present: Design[];
  future: Design[][];
  canUndo: boolean;
  canRedo: boolean;
}

export interface PriceBreakdown {
  tshirtPrice: number;
  printPrice: number;
  subtotal: number;
  tax: number;
  total: number;
}