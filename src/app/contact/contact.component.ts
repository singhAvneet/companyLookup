import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppService } from '../app.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit { 
  @Output() tabSelected: EventEmitter<any> = new EventEmitter();
url:string='';isRequired:boolean=true;
action:string='add';
companies: Array<any>= [] ;
showList:string="true";
company:string='';address:string='';revenue:string='';phone:string='';id:number=0;
  constructor(private _appService: AppService) { }

  ngOnInit() {
    var el = document.getElementById('contact');
    this._appService.sayHello("/list_company").subscribe(
    result => {      this.companies=result;      }
    );
  }
  onPost(){
    this.url = '/process_company?company='+this.company+'&address='+this.address+'&revenue='+this.revenue+'&phone='+this.phone;

    this._appService.sayHello(this.url).subscribe(
      result => { alert(JSON.stringify(result)); }
      );
  }

  removeAttribut(row:string){  
    this.isRequired=false;
    }

    onUpdate(){    
      this.url = '/update_get?id='+this.id+'&company='+this.company+'&address='+this.address+'&revenue='+this.revenue+'&phone='+this.phone;
      this._appService.sayHello(this.url).subscribe(
        result => { alert(JSON.stringify(result)); }
        ); 
        this.showList="true";
      }

    editRecords(num:number){
      this.showList="false";
      this.company=this.companies[num].company;
      this.address=this.companies[num].address;
      this.phone=this.companies[num].phone;
      this.revenue=this.companies[num].revenue;
     this.id=this.companies[num].id;
      this.action="update";
        
    } 
  
   

}
