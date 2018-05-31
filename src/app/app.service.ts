import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
    // private greetUrl = 'https://calm-ocean-26841.herokuapp.com/list_pets';
    // private greetUrl = 'https://singhavneet.000webhostapp.com/vote/api.php/?party=Conservative&month=may&email=';
// private greetUrl='https://company-look-up.herokuapp.com/list_pets';
private greetUrl='/list_pets';
    // private greetUrl='https://freegeoip.net/json/';

    // Resolve HTTP using the constructor
    constructor(private _http: Http) {


     }

    sayHello(): Observable<any> {
        return this._http.get(this.greetUrl).map((response: Response) => {
            return response.json();
        });
    }

  
}