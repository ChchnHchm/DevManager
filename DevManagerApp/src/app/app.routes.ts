import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocDetailComponent } from './components/doc-detail/doc-detail.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    { path: 'docs', component: DocListComponent },
    { path: 'docs/:id', component: DocDetailComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', redirectTo: '/docs', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
