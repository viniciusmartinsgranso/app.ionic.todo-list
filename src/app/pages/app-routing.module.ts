import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./main/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./initial/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./initial/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./initial/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./main/task/task.module').then(m => m.CreateTaskPageModule)
  },
  {
    path: 'task/:id',
    loadChildren: () => import('./main/update-task/update-task.module').then( m => m.UpdateTaskPageModule)
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./main/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./main/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
