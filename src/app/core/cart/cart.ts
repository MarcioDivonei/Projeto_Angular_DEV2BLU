import { Component } from '@angular/core';
import { CartService } from '../services/cart';
import { ProductOnCartType } from '../services/product';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  protected products!: ProductOnCartType[];
  protected cartActive = false;
  constructor(private cartService: CartService) {
    this.cartService.cartItemsHasChanged().subscribe((products: Array<ProductOnCartType>) => {
      this.products = products;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeItemById(productId);
  }
}