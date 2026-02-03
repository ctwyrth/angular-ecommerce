import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    let inCartItem: CartItem | undefined = this.cartItems.find(item => item.id === theCartItem.id);

    if (inCartItem != undefined) {
      inCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  subtractFromCart(item: CartItem) {
    if (item.quantity > 1) {
      this.cartItems[this.cartItems.indexOf(item)].quantity--;
    } else {
      this.removeFromCart(item);
    }

    this.computeCartTotals();
  }

  removeFromCart(item: CartItem) {
    let removeIndex = this.cartItems.indexOf(item);

    if (removeIndex > -1) {
      this.cartItems.splice(removeIndex, 1);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPrice: number = 0.00;
    let totalQuantity: number = 0;

    for (let item of this.cartItems) {
      totalPrice += item.unitPrice * item.quantity;
      totalQuantity += item.quantity;
      console.log(`Item: ${item.name}, Quantity: ${item.quantity}, Unit Price: ${item.unitPrice}`);
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    console.log(`totalPrice: ${totalPrice}, totalQuantity: ${totalQuantity}`);
  }
}
