import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AddNewProductInterface, CartSearchParamsInterface } from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getAllCarts(params?: {
    limit: number,
    sort: 'desc' | 'asc',
    startdate: string,
    enddate: string,
  }) {
    return this.http.get<any>(`${environment.apiBaseUrl}/carts`,{
        params: params
      }
    );
  }

  getSingleCart(cart_id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/carts${cart_id}`);
  }

  getUserCarts(user_id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/carts/user/${user_id}`);
  }

  addNewProduct(data: AddNewProductInterface) {
    return this.http.post<any>(`${environment.apiBaseUrl}/carts`, data);
  }

}
