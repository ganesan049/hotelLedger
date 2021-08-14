import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
// import sha256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl = "http://localhost:5000"

  img = '';
  name = '';
  constructor(private http: HttpClient) { }

  /**
   * setName
   */
  public setName(name:any) {
    localStorage.setItem('name',name)
    this.name = name;
  }
  /**
   * getName
   */
  public getName() {
    return this.name || localStorage.getItem('name');
  }
  /**
   * setImg
   */
  public setImg(img:any) {
    localStorage.setItem('img',img)
    this.img = img;
  }
  /**
   * getImg
   */
  public getImg() {
    return this.img || localStorage.getItem('img');
  }

  public encrypt(password: string) {
    // let data = sha256(password).toString();
    return  password
  }

  public get (url: string, params?: HttpParams, headers?: HttpHeaders): Observable<Object> {

    if (headers == null) {
      headers = new HttpHeaders()
        .set('Accept', 'application/json')
        // .set('Authorization',localStorage.getItem('token') || "null")
    }
    return this.http.get(`${this.apiUrl}${url}`,{ headers, params });
  };

  public post (url: string, body: any, params?: HttpParams, headers?: HttpHeaders){

    if (headers == null) {
      headers = new HttpHeaders()
        .set('Accept', 'application/json')
    }
     return this.http.post(`${ this.apiUrl }${ url }`, body, { params, headers});
    }
  public delete (url: string,body:any,  params?: HttpParams, headers?: HttpHeaders ){
    //console.log(`url: ${url}`);
    return this.http.delete(`${ this.apiUrl }${ url }`, { params, headers, body});
  }

  public handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${ error.status }, ` +
        `body was: ${ error.error }`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  public extractData (res: any) {
    // console.log("test---ui",res);
    let body = res;
    return body || {};
  }

  public loggedIn(){
    if(localStorage.getItem('token') == 'undefined'){
      return false;
    }
    return !!localStorage.getItem('token');
  }

  public getToken(){
    return localStorage.getItem('token') || undefined;
  }

  public setToken(token:any){
    return localStorage.setItem('token',token);
  }
}
