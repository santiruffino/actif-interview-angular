import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsListService {
  constructor(private http: HttpClient) {}

  getProductsList(limit: number): Observable<any> {
    const url = 'https://fakestoreapi.com/products';

    let queryParams = new HttpParams();
    queryParams = queryParams.append('limit', limit);

    return this.http.get(url, { params: queryParams });
  }
}
