import { Injectable } from '@angular/core';
import { db } from '../db/app-db';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  add(user: User) { return db.users.add(user); }
  getAll() { return db.users.toArray(); }
  getById(id: number) { return db.users.get(id); }
}
