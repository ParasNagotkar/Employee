import { Component,OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';


export interface Employee {
  id: number;
  name: string;
  address: string;
  designation: string;
}

var Employee_Data: Employee[] = [

];


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
 
  public type=""
  constructor(private _employees :EmployeeService,private rout :Router,public dialog :MatDialog){}

  openDialog(id:number){
   this.dialog.open(DeleteModalComponent, {
    data: {
      id: id
    }
  });
 
 }

  ngOnInit(): void {
    this.type="R"
    this._employees.GetEmployee(this.type,0).subscribe(data =>{
      Employee_Data = data,
      console.log(data),
      console.log(Employee_Data);
      this.dataSource=Employee_Data;
    })
  }

  displayedColumns: string[] = ['id', 'name', 'address', 'designation','Action'];
  dataSource =Employee_Data;

  Add(){
    this.rout.navigate(['/employeeform']);
  }


   Edit(id:number){
    debugger;
     this.rout.navigate(['/employeeform',id]);
   }

   Delete(id:number){
     this._employees.DeleteEmployee(id).subscribe(response => {
      console.log('Employee Deleted successfully', response);
       this.type ='R';
       this._employees.GetEmployee(this.type,0).subscribe(data=>{
        Employee_Data = data;
        this.dataSource= Employee_Data;
       })
    },
    error => {
      console.error('Error deleting employee', error);
    });
    
   }
  
}
