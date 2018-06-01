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
onNavigate(tab:string){
 
this.tabSelected=tab;
  }

 
  onClickbody() {
    var el = document.getElementById('myNavbar');
    // var navEl = document.getElementById('navClass');
    el.setAttribute("style", "display:none;");

  }


}
