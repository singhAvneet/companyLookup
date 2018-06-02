import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

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

  ngOnInit(): void {  }

tabSelected='contact';
companies: Array<any>= [] ;
// employees: Array<any>= [] ;
onNavigate(tab:string){ 
  if(tab==="newcompany"){
    this._appService.sayHello("/list_company").subscribe(
    result => {      this.companies=result;     }
    );     
    }

  this.tabSelected=tab;
  }


 

}
