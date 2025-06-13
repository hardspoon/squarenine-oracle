export interface GridFrequencies {
  [digit: string]: number;
}

export interface NumerologyReading {
  name: string;
  birthdate: string;
  email: string;
  gridFrequencies: GridFrequencies;
  lifePath: number;
}

export type AppState = 
  | 'initial' 
  | 'grid_displayed' 
  | 'loading_reading' 
  | 'reading_complete';
