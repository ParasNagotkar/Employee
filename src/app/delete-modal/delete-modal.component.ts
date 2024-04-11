import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _employees: EmployeeService,
    private route :Router
  ) {
    console.log(this.data.id); 
  }

  Delete(id:number){
    this._employees.DeleteEmployee(id).subscribe(response => {
     console.log('Employee Deleted successfully', response);
     window.location.reload();
   },
   error => {
     console.error('Error deleting employee', error);
   });
   
  }


}
