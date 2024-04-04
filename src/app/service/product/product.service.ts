import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(params?: {
    limit: number,
    sort: 'desc' | 'asc',
  }) {
    return this.http.get<any>(`${environment.apiBaseUrl}/products`,{
        params: params
      }
    );
  }

  getProduct(product_id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/products/${product_id}`);
  }

  getAllCategories() {
    return this.http.get<any>(`${environment.apiBaseUrl}/products/categories`);
  }

  getProductsInCategory(category: string, params?: {
    limit: number,
    sort: 'desc' | 'asc',
  }) {
    return this.http.get<any>(`${environment.apiBaseUrl}/products/category/${category}`, {
      params: params
    });
  }

}
