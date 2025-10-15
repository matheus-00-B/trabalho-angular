export interface User {
  id?: number;
  fullName: string;
  email: string;
  points?: number; // Pontos de gamificação
  medals?: string[]; // Medalhas conquistadas
}
