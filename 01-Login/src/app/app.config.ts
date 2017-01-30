import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppConfig {

  config: any = {};
  constructor(private http: Http) {}

  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('/env')
        .map(res => res.json())
        .subscribe(
          data => {
            this.config = data;
            resolve(true);
          },
          error => reject(error)
        );
    });
  }
}