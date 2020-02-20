import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SubmitService {
    baseUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    getAllUsers() {
        return this._http.get(this.baseUrl + '/getAllUsers')
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: Response) {
        return throwError(error || 'SERVER ERROR');
      }
  }
