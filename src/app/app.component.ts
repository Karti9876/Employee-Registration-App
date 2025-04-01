import { Component , OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor} from '@angular/common';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NgFor , NgClass , NgIf , FormsModule , HttpClientModule   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Employee-Registration-App';
  stepLists : any[] = [
    {stepName:"Basic Details" , isComplete:false},
    {stepName:"Skills" , isComplete:false},
    {stepName:"Experience" , isComplete:false},
  ]
  activeStep : any = this.stepLists[0];
  setActiveStep(activeStep : any){
    this.activeStep = activeStep;
}
  employeeObj : any ={
  "roleId": 0,
  "userName":"string",
  "empCode": "",
  "empId": 0,
  "empName": "",
  "empEmailId": "",
  "empDesignationId": 0,
  "empContactNo": "",
  "empAltContactNo": "",
  "empPersonalEmailId": "",
  "empExpTotalYear": 0,
  "empExpTotalMonth": 0,
  "empCity": "",
  "empState": "",
  "empPinCode": "",
  "empAddress": "",
  "empPerCity": "",
  "empPerState": "",
  "empPerPinCode": "",
  "empPerAddress": "",
  "password": "",
  erpEmployeeSkills : [],
  ermEmpExperience:[]
 }
designationList : any[] = []
roleList : any[] = []

employeeList :any[] = []

stepCompletionLine : number = 8; // Progress Tracker
constructor(private http : HttpClient){

}
ngOnInit(): void {
  this.loadRoles();
  this.loadDesignations();
  this.getAllEmployee();
}
loadRoles(){
  this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllRoles").subscribe((res:any)=>{
    this.roleList = res.data
  })

}
loadDesignations(){
  this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllDesignation").subscribe((res:any)=>{
    this.designationList = res.data
  })
}
isCreateView:boolean = false;

addNew(){
  this.isCreateView = true;
}

gotoStep2(){
  const currentStep = this.stepLists.find(m=>m.stepName == this.activeStep.stepName);
  currentStep.isComplete = true;
  this.activeStep = this.stepLists[1];
  this.stepCompletionLine = 50
}
gotoStep3(){
  const currentStep = this.stepLists.find(m=>m.stepName == this.activeStep.stepName);
  currentStep.isComplete = true;
  this.activeStep = this.stepLists[2];
  this.stepCompletionLine = 100 

}
addSkill(){
    const skillObj = {
      "empSkillId": 0,
      "empId": 0,
      "skill": "",
      "totalYearExp": 0,
      "lastVersionUsed": ""
  }
    this.employeeObj.erpEmployeeSkills.push(skillObj);
  }
addExp(){
    const ExpObj ={
      "empExpId": 0,
      "empId": 0,
      "companyName": "",
      "startDate": "2025-03-24T12:55:33.661Z",
      "endDate": "2025-03-24T12:55:33.661Z",
      "designation": "",
      "projectsWorkedOn": ""
    }

    this.employeeObj.ermEmpExperience.push(ExpObj)
  }
  saveEmployee(){
    console.log(this.employeeObj)
    this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeApp/CreateNewEmployee/" , this.employeeObj ,  { headers: { 'Content-Type': 'application/json' } })
    .subscribe((res:any)=>{
      if(res.result){
        alert("Employee Created Successfully");
        this.getAllEmployee();
        this.isCreateView = false
      }
      else{
        alert(res.message)
      }
    })
  }

  getAllEmployee(){
    this.http.get('https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllEmployee').subscribe((res:any)=>{
      this.employeeList = res.data;
    })
  }
  // For Editing Table
  onEdit(id:number){
    this.http.get('https://freeapi.miniprojectideas.com/api/EmployeeApp/GetEmployeeByEmployeeId?id='+ id).subscribe((res:any)=>{
      this.employeeObj = res.data;
      this.employeeObj.empId = id
      this.addNew();
    })
  }
  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete");
    this.http.delete('https://freeapi.miniprojectideas.com/api/EmployeeApp/DeleteEmployeeByEmpId?empId='+id).subscribe((res:any)=>{
      if(isDelete){
        alert("Employee Deleted Successfully");
        this.getAllEmployee();
      }
    
    })

  }

  UpdateEmployee(){
    this.http.put("https://freeapi.miniprojectideas.com/api/EmployeeApp/UpdateEmployee/" , this.employeeObj ,  { headers: { 'Content-Type': 'application/json' } })
    .subscribe((res:any)=>{
      if(res.result){
        alert("Employee Created Successfully");
        this.getAllEmployee();
        this.isCreateView = false
      }
      else{
        alert(res.message)
      }
    })
  }
}
