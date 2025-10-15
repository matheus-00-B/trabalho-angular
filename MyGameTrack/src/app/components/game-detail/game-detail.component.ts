import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CommentService } from '../../services/comment.service';
import { Game } from '../../models/game.model';
import { CommentModel } from '../../models/comment.model';

@Component({ selector: 'app-game-detail', templateUrl: './game-detail.component.html' })
export class GameDetailComponent implements OnInit {
  game?: Game;
  comments: CommentModel[] = [];
  newComment = '';
  currentUserId = 1; // simplificação: usar usuário 1 para demonstração

  constructor(private route: ActivatedRoute, private gs: GameService, private cs: CommentService) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const id = +params['id'];
      this.game = await this.gs.getById(id);
      this.comments = await this.cs.getByGame(id);
    });
  }

  async sendComment() {
    if (!this.game) return;
    const c: CommentModel = { gameId: this.game.id!, userId: this.currentUserId, text: this.newComment, date: new Date().toISOString() };
    await this.cs.add(c);
    this.newComment = '';
    this.comments = await this.cs.getByGame(this.game.id!);
  }

  async rate(value: number) {
    if (!this.game) return;
    const updated = this.game.ratings ? [...this.game.ratings, value] : [value];
    this.game.ratings = updated;
    await this.gs.update(this.game.id!, { ratings: updated });
    this.game = await this.gs.getById(this.game.id!);
  }
}
