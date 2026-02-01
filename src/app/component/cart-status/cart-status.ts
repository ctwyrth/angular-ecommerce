import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-status',
  standalone: false,
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css',
})

export class CartStatus implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
        console.log(`totalPrice: ${data}`);
      }
    );

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
        console.log(`totalQuantity: ${data}`);
      }
    );
  }
}
