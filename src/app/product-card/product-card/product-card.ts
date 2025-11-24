import { Component, Input } from '@angular/core';
import { ProductService, ProductType } from '../../core/services/product';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  @Input()
  public product!: ProductType;

  constructor(private productService: ProductService, private cartService: CartService) {}

 
 
}