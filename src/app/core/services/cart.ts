import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductOnCartType } from './product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
   updateTotal(productId: number, total: number) {
   const cartItems = this.cartItems.getValue();
   const item = cartItems.find(p => p.id === productId);
    if (item) {
     item.total = total;
      this.cartItems.next(cartItems); // atualiza o carrinho com o novo total
    }


  }

  private cartItems = new BehaviorSubject<Array<ProductOnCartType>>([]);

  public addItem(item: ProductOnCartType): void {
    let cartItems = this.cartItems.getValue();
    let existente = cartItems.find(p => p.id === item.id);

    if (existente) {
      existente.quantity = (existente.quantity || 0) + (item.quantity || 1);
    } else {
      item.quantity = item.quantity || 1;
      cartItems.push(item);
    }

    this.cartItems.next(cartItems);

    Swal.fire({
      title: 'Adicionado!',
      text: 'Produto foi adicionado ao carrinho.',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#e91e63',
    });
  }

  public cartItemsHasChanged(): Observable<Array<ProductOnCartType>> {
    return this.cartItems.asObservable();
  }

  public removeItemById(productId: number): void {
    let products = this.cartItems.getValue();
    products = products.filter(el => el.id !== productId);
    this.cartItems.next(products);
  }

updateQuantity(productId: number, quantity: number) {
  const cartItems = this.cartItems.getValue();
  const item = cartItems.find(p => p.id === productId);
  if (item) {
    item.quantity = quantity;
    item.total = item.price * quantity;
    this.cartItems.next(cartItems);
  }
}

}
