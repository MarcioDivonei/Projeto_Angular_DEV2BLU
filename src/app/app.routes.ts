import { Routes } from '@angular/router';
import { Products } from '../app/products/products/products';
import { ProductDetail } from '../app/products/product-detail/product-detail';
import { Cart } from './core/cart/cart';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    { path: 'products', component: Products},    
    { path: 'product/:id', component: ProductDetail},
    { path: 'cart', component: Cart}
];