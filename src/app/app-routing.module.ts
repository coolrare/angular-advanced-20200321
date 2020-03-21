import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { PostsModule } from './posts/posts.module';

const routes: Routes = [
  {
    path: 'login',
    // component: LoginComponent
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainComponent,
    // children: []
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
