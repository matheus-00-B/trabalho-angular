import { Injectable } from '@angular/core';
import { db } from '../db/app-db';
import { CommentModel } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  add(comment: CommentModel) { return db.comments.add(comment); }
  getByGame(gameId: number) { return db.comments.where('gameId').equals(gameId).sortBy('date'); }
  delete(id: number) { return db.comments.delete(id); }
}
