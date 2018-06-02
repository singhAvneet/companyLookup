import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AppService } from '../app.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit { 

  @Input() companies: Array<any>;
  result:string='';
url:string='';isRequired:boolean=true;
action:string='add';

company:string='';address:string='';revenue:string='';phone:string='';id:number=0;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    // this.editRecords(0);  
    this.action="add"; 
  }
  onPost(){
    this.url = '/process_company?company='+this.company+'&address='+this.address+'&revenue='+this.revenue+'&phone='+this.phone;

    this._appService.sayHello(this.url).subscribe(
      result => { 
        if(result.affectedRows==1)
        this.result="Sucessfully Created"
        else
        this.result="Failed to Create due to :"+JSON.stringify(result)
       }
      );
      window.scrollTo({ top: -1000, behavior: "smooth" });
  }
 onUpdate(){    
      this.url = '/update_get?id='+this.companies[this.index].id+'&company='+this.companies[this.index].company+'&address='+this.companies[this.index].address+'&revenue='+this.companies[this.index].revenue+'&phone='+this.companies[this.index].phone;
      this._appService.sayHello(this.url).subscribe(
        result => {
          if(result.affectedRows==1){
          this.result="Sucessfully Updated";
          if(this.company!=this.companies[this.index].company)
           this.updateEmployees();
          }
          else
          this.result="Failed to Update due to :"+JSON.stringify(result);
          this.company='';
         }
        );        
        window.scrollTo({ top: -1000, behavior: "smooth" });
        this.action="add";
      }
      updateEmployees(){
        this.url = '/sync_employee?company='+this.companies[this.index].company+'&naming=&companyid='+this.companies[this.index].id;
        this._appService.sayHello(this.url).subscribe(
          result => {    }
          ); 
          this.action="add";
      }
index:number;
    editRecords(num:number){
      this.action="update";
      this.result='';//displays message on the page eg: updated sucessfully, etc...
      this.index=num;
    //   this.showList="false";
      this.company=this.companies[num].company;
    
      
      window.scrollTo({ top: 1000, behavior: "smooth" });
        
    } 
  
   

}
