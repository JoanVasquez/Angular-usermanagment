import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCardsComponent } from '../user-cards/user-cards.component';
import { HomeComponent } from '../home/home.component'
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
    { path: '', component: UserCardsComponent, canActivate: [AuthGuardService] },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '' }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
