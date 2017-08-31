import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    // don't need to pass this header, bacause there is a default header with application/json
    const headers = new Headers({'Content-Type':'application/json'});
    // return this.http.post('https://udemy-ng-http-5e39f.firebaseio.com/data.json', servers, {headers: headers});
    return this.http.put('https://udemy-ng-http-5e39f.firebaseio.com/data.json', servers, {headers: headers});
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-5e39f.firebaseio.com/data.json').map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCH_' + server.name;
        }
        return data;
      }
    // with catch, you can transformation the result of the error for your App
    ).catch(
      (error: Response) => {
        //console.log(error);
        return Observable.throw('Something went wrong!');
      }
    );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-5e39f.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
}
