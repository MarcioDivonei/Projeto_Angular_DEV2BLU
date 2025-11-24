import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from '../services/cart';
import { ProductOnCartType } from '../services/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit, OnDestroy {
  public products: ProductOnCartType[] = [];
  public totalCartValue = 0;
  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService
      .cartItemsHasChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: ProductOnCartType[] = []) => {
        this.products = products;
        this.totalCartValue = this.calculateTotal(products);
      });
  }

  private calculateTotal(products: ProductOnCartType[]): number {
    return products.reduce((acc, p) => acc + p.price * (p.quantity ?? 1), 0);
  }

  removeItem(productId: number): void {
    this.cartService.removeItemById(productId);
  }

  incrementar(product: ProductOnCartType): void {
    const atual = product.quantity ?? 0;
    const novo = atual + 1;
    this.cartService.updateQuantity(product.id, novo);
    // o serviço emite a nova lista e o subscribe atualiza products e total
  }

  decrementar(product: ProductOnCartType): void {
    const atual = product.quantity ?? 0;
    if (atual > 1) {
      const novo = atual - 1;
      this.cartService.updateQuantity(product.id, novo);
    } else {
      // se quiser remover quando chegar a zero, descomente:
      // this.removeItem(product.id);
    }
  }

  trackByProduct(index: number, item: ProductOnCartType) {
    return item.id;
  }

  finalizarCompra(): void {
    // exemplo: navegar para checkout
    this.router.navigate(['/checkout']);
  }

  continuarComprando(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
