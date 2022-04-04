import { Routes } from '@angular/router';
import { AppBlankComponent } from './layouts/blank/blank.component';

import { FullComponent } from './layouts/full/full.component';
import { DashboardResolver } from './resolvers/dashboard.resolver';

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
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule),
                resolve: { dashboard: DashboardResolver  },
            },
            {
              path: 'admin',
              loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            },
            {
              path: 'planificacion',
              loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            }
        ]
    },
    {
      path: '',
      component: AppBlankComponent,
      children: [
        {
          path: 'auth',
          loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
        },
      ]
    },
    {
      path: '**',
      redirectTo: 'auth/404'
    }
];
