import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
url:string='';
company:string='';address:string='';revenue:string='';phone:string='';
  constructor(private _appService: AppService) { }

  ngOnInit() {
    var el = document.getElementById('contact');
    this._appService.sayHello("/list_pets").subscribe(
    result => { alert(JSON.stringify(result)); }
    );
  }
  onPost(){
    this.url = '/process_get?company='+this.company+'&address='+this.address+'&revenue='+this.revenue+'&phone='+this.phone;

    this._appService.sayHello(this.url).subscribe(
      result => { alert(JSON.stringify(result)); }
      );
  }

}
