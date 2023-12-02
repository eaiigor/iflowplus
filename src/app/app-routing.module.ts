import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { SearchComponent } from './components/search/search.component';
import { MyListComponent } from './components/my-list/my-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'my-list', component: MyListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
