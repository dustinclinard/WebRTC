import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { MonitorComponent } from './pages/monitor.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: '**', redirectTo: '' }
];
