import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
tel:string='';
province:string='';
  constructor(private _appService: AppService) { }

  ngOnInit() {
    var el = document.getElementById('contact');
    this._appService.sayHello()
    .subscribe(
    result => {alert(JSON.stringify(result));
      this.province=result.region_name;
switch(result.region_code){
case "SK":this.tel="3065024823";break;
case "AB":this.tel="5872870207";break;
case "BC":this.tel="7786505198";break;
}

    
    
     
    }
    );
  }

}
