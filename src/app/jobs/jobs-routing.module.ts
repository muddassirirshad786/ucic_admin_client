import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
const routes: Routes = [
  { path: 'create', component: JobsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
