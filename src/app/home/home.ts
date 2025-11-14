import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/services/cart';
import { ProductType } from '../core/services/product';
import { Cart } from "../core/cart/cart";

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Menu {
  protected productQtd: number = 0;
  protected cartActive: boolean = false;

  constructor(private cartService: CartService) {
    this.cartService.cartItemsHasChanged().subscribe((products: Array<ProductType>) => {
      this.productQtd = products.length;
    })
  }

  
  protected showCart() {
    this.cartActive = true;
  }

}