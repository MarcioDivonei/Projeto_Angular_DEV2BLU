import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, ProductType } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  imports: [ReactiveFormsModule],
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
      quantity: [1],
      observations: ['Digite aqui...', Validators.required]
    });

    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.formGroup.get('quantity')?.valueChanges.subscribe((value) => {
      console.log('Quantity changed:', value);
      if (value < 1) {
        this.formGroup.get('observations')?.disable();
      } else {
        this.formGroup.get('observations')?.enable();      
      }
    });
  }

  addToCart() {

    if (this.formGroup.invalid) {
      alert('Por favor, preencha os campos corretamente.');
      return;
    }

    this.cartService.addItem({
      ...this.product,
      ...this.formGroup.value
    });
  }
 
incrementar() {
  const atual = this.formGroup.get('quantity')?.value || 0;
  const novo = atual + 1;
  this.formGroup.get('quantity')?.setValue(novo);

  // Atualiza no carrinho
  this.cartService.updateQuantity(this.product.id, novo);

  // Se quantidade for 4, atualiza o valor total
  if (novo === 4) {
    const total = this.product.price * novo;
    this.cartService.updateTotal(this.product.id, total);
  }
}

decrementar() {
  const atual = this.formGroup.get('quantity')?.value || 0;
  if (atual > 1) {
    const novo = atual - 1;
    this.formGroup.get('quantity')?.setValue(novo);

    
    this.cartService.updateQuantity(this.product.id, novo);

    
    if (novo === 4) {
      const total = this.product.price * novo;
      this.cartService.updateTotal(this.product.id, total);
    }
  }
}
}
