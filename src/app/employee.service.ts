import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


export interface IEmployee{
  id:number,
  name:string,
  address:string,
  designation:string,
  Email:string,
  MobileNumber:string,
  DOB:string,
  WorkExperience:string,
  description:string
  }

  

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _getUrl = "https://localhost:44343/api/Employee/GetEmployee"
  private _saveUrl = "https://localhost:44343/api/Employee/InsertUpdateEmployee"
  private _deleteUrl = "https://localhost:44343/api/Employee/DeleteEmployee"

  constructor(private http: HttpClient) { 
}

GetEmployee(type:string,id:number):Observable<IEmployee[]>{
  const params = new HttpParams()
   .set('type' ,type)
   .set('id' ,id.toString())
   return this.http.get<IEmployee[]>(this._getUrl,{params}).pipe(catchError(this.HandleError))
}

addEmployee(employee: IEmployee): Observable<IEmployee> {
  console.log(employee)
  return this.http.post<IEmployee>(this._saveUrl, employee).pipe(
    catchError(this.HandleError)
  );
}

DeleteEmployee(id:number):Observable<IEmployee[]>{
  const params = new HttpParams()
  .set('id', id.toString());
 return this.http.delete<IEmployee[]>(this._deleteUrl,{params}).pipe(catchError(this.HandleError))
}


HandleError(error:HttpErrorResponse){
  return throwError(error.message || 'Sometthing went wrong') 
}

}

