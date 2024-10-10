import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private http:HttpClient) { }

  getApi(url:any){

    return this.http.get(url)

  }

  postApi(url:any,data:any){
   return this.http.post(url,data)
  }

  putApi(){}

  deleteApi(){}
}
