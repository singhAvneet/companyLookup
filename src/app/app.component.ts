import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hello from angular app';
  author='© 2018 by Avneet Singh. ';
  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    
    // this._appService.sayHello()
    //   .subscribe(
    //   result => {
    //     alert(result.region_code);
       
    //   }
    //   );
  }

tabSelected='contact';
companies: Array<any>= [] ;
// employees: Array<any>= [] ;
onNavigate(tab:string){ 
  if(tab==="newcompany"){
    this._appService.sayHello("/list_company").subscribe(
    result => {      this.companies=result;     }
    );     
    }
  // if(tab==="newemployee"){
  //   this._appService.sayHello("/list_employee").subscribe(
  //   result => {      this.employees=result;     }
  //   );     
  //   }
  this.tabSelected=tab;
  }





}
