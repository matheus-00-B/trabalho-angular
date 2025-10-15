import Dexie, { Table } from 'dexie';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { CommentModel } from '../models/comment.model';

export class AppDB extends Dexie {
  games!: Table<Game, number>;
  users!: Table<User, number>;
  comments!: Table<CommentModel, number>;

  constructor() {
    super('MyGameTrackDB');

    this.version(1).stores({
      games: '++id, name, category',
      users: '++id, fullName, email',
      comments: '++id, gameId, userId, date'
    });
  }
}

export const db = new AppDB();
