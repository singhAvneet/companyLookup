import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  companies: Array<any>= [] ;
  employees: Array<any>= [] ;
  action:string='add';
  url:string='';
  result:string='';
  selectedCompany:any;
  company:string='';address:string='';companyid:number;naming:string='';
  id:number=0;
  constructor(private _appService: AppService) { }

  ngOnInit() {
    var el = document.getElementById('contact');
    this._appService.sayHello("/list_company").subscribe(
    result => {      
      this.companies=result; 
      this.companyid=this.companies[0].id;
      this.company=this.companies[0].company;
      this.selectedCompany = this.companies[0]; 
       this.listUser();   }
    ); 
    
  } 
  
  onPost(){
    this.url = '/process_employee?naming='+this.naming+'&address='+this.address+'&company='+this.company+'&companyid='+this.companyid;
    this._appService.sayHello(this.url).subscribe(
      result => {
        if(result.affectedRows==1)
        this.result="Sucessfully Added"
        else
        this.result="Failed to Add due to :"+JSON.stringify(result)
        }
      );
  }

setNewCompany(id: any): void {
  this.result='';
  this.companyid=this.companies[id].id;
    this.company=this.companies[id].company;  
}
listUser(): void { 
  this.result=''; 
    this.url = '/list_employee?companyid='+this.selectedCompany.id;
    this._appService.sayHello(this.url).subscribe(
      result => { this.employees=result;    }
      );
}
editRecords(emp:number){
  this.result='';
  this.id=this.employees[emp].id;
  this.companyid=this.employees[emp].companyid;
  this.naming=this.employees[emp].naming;
  this.address=this.employees[emp].address;
  this.company=this.employees[emp].company;
   this.action="update";    
}
deleteRecords(emp:number){
  this.url = '/delete_employee?id='+this.employees[emp].id;
    this._appService.sayHello(this.url).subscribe(
      result => { 
        if(result.affectedRows==1)
        this.result="Sucessfully Deleted"
        else
        this.result="Failed to Delete due to :"+JSON.stringify(result)
        }
      );
}
onUpdate(){ 
  this.action="add";
  this.url = '/update_employee?id='+this.id+'&naming='+this.naming+'&address='+this.address+'&companyid='+this.companyid+'&company='+this.company;
  this._appService.sayHello(this.url).subscribe( result => {
    if(result.affectedRows==1)
    this.result="Sucessfully Updated"
    else
    this.result="Failed to Update due to :"+JSON.stringify(result)
   }  );   
  }

}
