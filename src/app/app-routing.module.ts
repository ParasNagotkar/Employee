import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeformComponent } from './employeeform/employeeform.component';


const routes: Routes = [
  {path : '', redirectTo: "/employee" , pathMatch: 'full' },
  {path : 'employee', component : EmployeeDetailComponent},
  {path : 'employeeform', component : EmployeeformComponent},
  {path : 'employeeform/:id', component : EmployeeformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[EmployeeDetailComponent,EmployeeformComponent]

