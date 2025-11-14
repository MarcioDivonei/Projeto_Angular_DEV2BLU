import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject: BehaviorSubject<Array<ProductType>> = new BehaviorSubject<Array<ProductType>>([]);
  
  constructor(private http: HttpClient) {
    
    }
 
  public getProducts(): Observable<any> {
    return this.http.get("http://localhost:3000/products");
  }

  public getProductById(id: number): any {
    return this.http.get(`http://localhost:3000/products/${id}`)   
  }

  deleteProductById(id: number) {
    const products = this.productsSubject.getValue().filter((item: ProductType) => item.id != id);
    this.productsSubject.next(products);
  }
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductOnCartType extends ProductType {
  quantity?: number;
  observations?: string;
}