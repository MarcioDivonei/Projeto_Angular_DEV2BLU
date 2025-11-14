import { Component } from '@angular/core';
import * as productCard from '../../product-card/product-card/product-card';
import { ProductService, ProductType } from '../../core/services/product';

@Component({
  selector: 'app-products',
  imports: [productCard.ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  protected products: Array<ProductType> = [];
  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe((result: any) => {
      this.products = result;
    });
  }
}