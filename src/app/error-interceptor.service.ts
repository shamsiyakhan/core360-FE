import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.warn(error)
        if (error.status === 400 && error.error?.message === 'Invalid token.') {
          // Redirect to the login page
          localStorage.clear();
          Swal.fire({
            text:"Session Expired Please Relogin",
            title: 'Session',
       
            icon: 'error',
            confirmButtonText: 'Ok'
            
          })
          this.router.navigate(['auth', 'login']);
        }
        return throwError(() => error);
      })
    );
  }
}
