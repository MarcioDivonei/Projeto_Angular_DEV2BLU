import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, ProductType } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private productId!: number;
  protected product!: ProductType;
  protected formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.productId = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.productService.getProductById(this.productId).subscribe((result: ProductType) => {
      this.product = result;
    });
    
    this.formGroup = this.formBuilder.group({
      quantity: [1]
    });

    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });


  }
  
  addToCart() {

    this.cartService.addItem({
      ...this.product,
      ...this.formGroup.value
    });
  }
 
incrementar() {
  const atual = this.formGroup.get('quantity')?.value || 0;
  const novo = atual + 1;
  this.formGroup.get('quantity')?.setValue(novo);
  this.cartService.updateQuantity(this.product.id, novo);
  const total = this.product.price * novo;
  this.cartService.updateTotal(this.product.id, total);
}

decrementar() {
  const atual = this.formGroup.get('quantity')?.value || 0;
  if (atual > 1) {
    const novo = atual - 1;
    this.formGroup.get('quantity')?.setValue(novo); 
    this.cartService.updateQuantity(this.product.id, novo);   
    const total = this.product.price * novo;
    this.cartService.updateTotal(this.product.id, total);
  }
}

}
