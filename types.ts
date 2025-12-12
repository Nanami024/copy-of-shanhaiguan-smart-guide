export interface Spot {
  id: number;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  image: string;
  desc: string;
  content: string;
  audio?: string;
}

export interface Facility {
  id: number;
  type: 'wc' | 'food';
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface Fortune {
  id: number;
  text: string;
}

export interface Meta {
  homeHint: string;
  completionTitle: string;
  completionDesc: string;
  overviewTitle: string;
  overviewContent: string;
}

export interface AppData {
  spots: Spot[];
  facilities: Facility[];
  fortunes: Fortune[];
  meta: Meta;
}