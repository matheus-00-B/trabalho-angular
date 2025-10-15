import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'games', loadComponent: () => import('./components/game-list/game-list.component').then(m => m.GameListComponent) },
  { path: 'games/new', loadComponent: () => import('./components/game-form/game-form.component').then(m => m.GameFormComponent) },
  { path: 'games/edit/:id', loadComponent: () => import('./components/game-form/game-form.component').then(m => m.GameFormComponent) },
  { path: 'games/:id', loadComponent: () => import('./components/game-detail/game-detail.component').then(m => m.GameDetailComponent) },
  { path: 'ranking', loadComponent: () => import('./components/ranking/ranking.component').then(m => m.RankingComponent) },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders = [
  provideRouter(routes)
];
