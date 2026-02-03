import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})

export class CartDetails implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
        console.log(`Total Price: ${data}`);
      }
    );

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
        console.log(`Total Quantity: ${data}`);
      }
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  decrementQuantity(item: CartItem) {
    this.cartService.subtractFromCart(item);
    this.cdr.detectChanges();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.cdr.detectChanges();
  }
}
