import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {




// private greetUrl='https://company-look-up.herokuapp.com/list_pets';
    private greetUrl='https://freegeoip.net/json/';
data:any={};

    constructor(private _http: Http) {
this.getContacts();this.getData();

     }

getData(){
  return this._http.get(this.greetUrl).map((res:Response)=>res.json())
}
getContacts(){
  this.getData().subscribe(data=>{alert(data);this.data=data})

}


}
