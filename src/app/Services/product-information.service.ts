import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductInformationService {

  private apiUrl = 'http://165.232.44.99/api/dress/demo/list';

  constructor(private http: HttpClient) { }

  getDressList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
