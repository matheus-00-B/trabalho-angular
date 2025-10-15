import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-form.component.html'
})
export class GameFormComponent implements OnInit {
  model: Game = { name:'', description:'', startDate:'', category:'Outro', ratings:[], userIds: [] } as Game;
  editing = false;
  id?: number;
  users: User[] = [];
  categories = ['Ação','RPG','Estratégia','Esporte','Simulação','Outro'];

  constructor(private gs: GameService, private us: UserService, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.users = await this.us.getAll();
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.editing = true;
        this.id = +params['id'];
        const g = await this.gs.getById(this.id);
        if (g) this.model = g as Game;
      }
    });
  }

  async save() {
    if (this.editing && this.id) {
      await this.gs.update(this.id, this.model);
      alert('Jogo atualizado');
    } else {
      await this.gs.add(this.model);
      alert('Jogo cadastrado');
    }
    this.router.navigate(['/games']);
  }

  clear() { this.model = { name:'', description:'', startDate:'', category:'Outro', ratings:[], userIds: [] } as Game; }
}
