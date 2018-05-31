import { Component, OnInit } from '@angular/core';
import {AppService} from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _appService: AppService) { }

  ngOnInit() {
    // var el = document.getElementById('contact');
    this._appService.sayHello()
    .subscribe(
    result => {
      alert(
        JSON.stringify(result));   
     
    }
    );
}
}
