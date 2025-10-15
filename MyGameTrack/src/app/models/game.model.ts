export type Category = 'Ação'|'RPG'|'Estratégia'|'Esporte'|'Simulação'|'Outro';

export interface Game {
  id?: number;
  name: string;
  description: string;
  startDate: string; // ISO
  endDate?: string;
  category: Category;
  ratings?: number[]; // array de estrelas (1..5)
  userIds?: number[]; // IDs dos usuários vinculados
}
