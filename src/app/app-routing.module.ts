import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { GameComponent } from 'src/app/game/game.component';
import { AboutComponent } from 'src/app/about/about.component';
import { InstructionsComponent } from 'src/app/instructions/instructions.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'about', component: AboutComponent},
  {path: 'instructions', component: InstructionsComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
