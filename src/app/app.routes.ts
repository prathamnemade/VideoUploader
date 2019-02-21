import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './mainpanel/login/login.component';
import { MainpanelComponent } from './mainpanel/mainpanel.component';
import { UploaderComponent } from './mainpanel/uploader/uploader.component';
const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'dashboard',
        component: MainpanelComponent
    },
    {
        path: 'addVideo',
        component: UploaderComponent
    },
    {
        path: '**',
        component: LoginComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }