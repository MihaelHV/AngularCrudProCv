import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  postAsesor(data:any){
    return this.http.post<any>("http://localhost:3000/asesorList/",data);
  }
  getAsesor(){
    return this.http.get<any>("http://localhost:3000/asesorList/");
  }
  putAsesor(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/asesorList/"+id,data);
  }
  deleteAsesor(id:number){
    return this.http.delete<any>("http://localhost:3000/asesorList/"+id);
  }


}

