import { Component, Input } from '@angular/core';
import { ProductService, ProductType } from '../../core/services/product';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  @Input()
  public product!: ProductType;
 
}