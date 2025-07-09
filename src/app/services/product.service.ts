import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http
      .post<Product>(`${environment.apiBaseUrl}/products/`, product)
      .subscribe();
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(
      `${environment.apiBaseUrl}/products/${id}`
    );
  }

  updateProduct(product: Product) {
    return this.http
      .patch<Product>(
        `${environment.apiBaseUrl}/products/${product.id}`,
        product
      )
      .subscribe();
  }
}
