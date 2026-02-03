import { Routes } from "@angular/router";

import { ProductList } from "./component/product-list/product-list";
import { ProductDetails } from "./component/product-details/product-details";
import { CartDetails } from "./component/cart-details/cart-details";
import { Checkout } from "./component/checkout/checkout";

export const routes: Routes = [
  {path: 'category', component: ProductList},
  {path: 'category/:id/:name', component: ProductList},
  {path: 'products', component: ProductList},
  {path: 'products/:id', component: ProductDetails},
  {path: 'search/:keyword', component: ProductList},
  {path: 'cart-details', component: CartDetails},
  {path: 'checkout', component: Checkout},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
