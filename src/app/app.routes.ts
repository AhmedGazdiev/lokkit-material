import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from '@core/guards';
import { AppLayoutComponent, AuthLayoutComponent, LoginComponent, RegisterComponent } from '@features/auth';
import { FeedComponent } from '@features/post';
import { ProfileComponent } from '@features/profile';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [notAuthGuard],
        children: [
            { path: 'login', title: 'Login', component: LoginComponent },
            { path: 'register', title: 'Register', component: RegisterComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'feed', title: 'Feed Posts', component: FeedComponent },
            { path: 'post', loadChildren: () => import('@features/post').then(p => p.POST_ROUTES) },
            {
                path: 'profile/:id',
                title: 'Profile',
                component: ProfileComponent,
                loadChildren: () => import('@features/profile').then(p => p.PROFILE_ROUTES)
            },
            { path: '', redirectTo: 'feed', pathMatch: 'full' }
        ]
    }
];
