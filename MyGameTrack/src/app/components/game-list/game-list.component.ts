import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { Game } from '../../models/game.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  users: User[] = [];
  categories = ['Ação','RPG','Estratégia','Esporte','Simulação','Outro'];
  selectedCategory = '';
  selectedUserId: number|null = null;

  constructor(private gs: GameService, private us: UserService, private router: Router) {}

  async ngOnInit() {
    await this.loadAll();
  }

  async loadAll() {
    this.games = await this.gs.getAll();
    this.users = await this.us.getAll();
    // Não limpa filtros automaticamente
  }

  async filter() {
    if (this.selectedCategory) {
      this.games = await this.gs.getByCategory(this.selectedCategory);
    } else if (this.selectedUserId) {
      this.games = await this.gs.getByUser(this.selectedUserId);
    } else {
      await this.loadAll();
    }
  }

  async delete(id?: number) {
    if (!id) return;
    if (!confirm('Deseja realmente excluir este jogo?')) return;
    await this.gs.delete(id);
    await this.loadAll();
  }

  edit(id?: number) { if(id) this.router.navigate(['/games/edit', id]); }
  view(id?: number) { if(id) this.router.navigate(['/games', id]); }

  async rate(game: Game, value: number) {
    if (!game.id) return;
    const updated = game.ratings ? [...game.ratings, value] : [value];
    await this.gs.update(game.id, { ratings: updated });
    await this.loadAll();
  }
}
