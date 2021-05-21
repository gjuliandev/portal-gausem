import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/starter',
                pathMatch: 'full'
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },
            {
              path: 'auth',
              loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
            },
            {
              path: 'pages',
              loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            }
        ]
    }
];
