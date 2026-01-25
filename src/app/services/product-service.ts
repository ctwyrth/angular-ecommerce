import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})

export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/products';

  constructor() {}

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.http.get<GetResponse>(searchUrl).pipe(map(response => response._embedded.products));

  }

}

interface GetResponse {

  _embedded: {
    products: Product[];
  }

}
