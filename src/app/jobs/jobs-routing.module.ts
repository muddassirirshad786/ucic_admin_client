import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
const routes: Routes = [
  { path: '', component: JobsListComponent },
  { path: 'create', component: JobsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
