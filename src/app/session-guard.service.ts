import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { ApirtcService } from './apirtc.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardService implements CanLoad {
  constructor(
    private http: HttpClient, 
    private router: Router,
    private apirtc:ApirtcService
  ) {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    console.warn("can load called")
    return this.http.get('http://localhost:3000/checkSession').pipe(
      map((res: any) => {
        if (res.logIn) {
          this.apirtc.registerUser(res.user)
          return true;
        } else {
          localStorage.clear();
          return this.router.parseUrl('/auth/login');
        }
      }),
      catchError((error) => {
        console.error('Error in session check:', error);
        localStorage.clear();
        return of(this.router.parseUrl('/auth/login'));
      })
    );
  }
}
