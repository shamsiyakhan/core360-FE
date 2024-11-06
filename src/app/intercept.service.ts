import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from local storage or any other storage you are using
    const token = localStorage.getItem('jwt');

    // Clone the request and add the authorization header
    let authReq = req;
    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });
    }

    // Pass the request to the next handler in the chain
    return next.handle(authReq);
}

}
