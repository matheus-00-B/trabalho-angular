import { Injectable } from '@angular/core';
import { db } from '../db/app-db';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  async add(game: Game) { return db.games.add(game); }
  async getAll() { return db.games.reverse().toArray(); }
  async getById(id: number) { return db.games.get(id); }
  async update(id: number, changes: Partial<Game>) { return db.games.update(id, changes); }
  async delete(id: number) { return db.games.delete(id); }

  // ratings: calcula média de um jogo
  avgRating(game: Game) {
    if (!game.ratings || game.ratings.length === 0) return 0;
    const sum = game.ratings.reduce((a,b)=>a+b,0);
    return +(sum / game.ratings.length).toFixed(2);
  }

  // ranking: retorna jogos ordenados por média decrescente
  async ranking() {
    const games = await db.games.toArray();
    return games.sort((a,b)=> (this.avgRating(b) - this.avgRating(a)));
  }

  // Listar todas as atividades de uma categoria
  async getByCategory(category: string) {
    return db.games.where('category').equals(category).toArray();
  }

  // Listar todas as atividades de um usuário
  async getByUser(userId: number) {
    return db.games.filter(g => g.userIds && g.userIds.includes(userId)).toArray();
  }
}
