import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder , ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


function onlyDigitsValidator(control: FormControl): { [key: string]: any } | null {
 
  
  const valid = /^\d+$/.test(control.value);
  return valid ? null : { 'onlyDigits': true };
}

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnInit {
  public id:number =0;
  public employees: { id: number; name: string; address:string ,designation: string,Email: string,MobileNumber: string,DOB: string,WorkExperience:string,description:string; }[] = [];
  public Type='';
  constructor(private formBuilder: FormBuilder ,private _employees:EmployeeService,private route :Router,
    private  activate :ActivatedRoute) { }

  public userform: FormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    Email:new FormControl(''),
    designation: new FormControl(''),
    mobNo: new FormControl(''),
    dob: new FormControl(''),
    workexp: new FormControl(''),
    desc: new FormControl('')
  })

ngOnInit(): void {
  this.userform = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(4)]),
    address: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required,Validators.email]),
    designation: new FormControl('', Validators.required),
    mobNo: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10),onlyDigitsValidator]),
    dob: new FormControl(''),
    workexp: new FormControl(''),
    desc: new FormControl('')
  });
  this.id =this.activate.snapshot.params['id'];
  if(this.id == undefined){
   this.id =0  
  }
  if(this.id !=0){
  this.Type="E"
  this.GetEmployeeData(this.id,this.Type)
  console.log(this.employees)
  }
}

GoBack(){
  debugger
  this.route.navigate(['/employee']);
}

SaveEmployee() {
  this.Type='';
     const id = parseInt(this.id.toString())
     const name  = this.userform.get('name')?.value
     const address= this.userform.get('address')?.value
     const designation = this.userform.get('designation')?.value
     const Email = this.userform.get('Email')?.value
     const MobileNumber = this.userform.get('mobNo')?.value
     const DOB = this.userform.get('dob')?.value
     const WorkExperience = this.userform.get('workexp')?.value
     const description = this.userform.get('desc')?.value
     this._employees.addEmployee({id, name, address, designation,Email,MobileNumber,DOB,WorkExperience,description }).subscribe(
      response => {
        console.log('Employee added successfully', response);
        this.userform=this.formBuilder.group({
          name: [''],
          address: [''],
          designation: [''],
          Email: [''],
          mobNo: [''],
          dob: [''],
          workexp: [''],
          desc: [''],
        })
        this.route.navigate(['/employee']);
      },
      error => {
        console.error('Error adding employee', error);
      }
    );
   }

   GetEmployeeData(id: number, type: string) {
    this._employees.GetEmployee(type, id).subscribe(data => {
      this.employees = data;
    
      for (let emp of this.employees) {
        this.id = emp.id;
        const dobDate = new Date(emp.DOB);
        this.userform = this.formBuilder.group({
          name: [emp.name],
          address: [emp.address],
          designation: [emp.designation],
          Email: [emp.Email],
          mobNo: [emp.MobileNumber],
          dob: [dobDate],
          workexp: [emp.WorkExperience],
          desc: [emp.description],
        });
      }
    });
  }

  }
    
 






