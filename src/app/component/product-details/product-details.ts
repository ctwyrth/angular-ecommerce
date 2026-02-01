import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

import { Product } from '../../common/product';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product!: Product;

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => {
        const productId: string = params.get('id')!;

        return { productId: +productId };
      }),
      switchMap(routeData => {
        return this.productService.getProductById(routeData.productId);
      })
    ).subscribe(product => {
      this.product = product;
      this.cdr.detectChanges();
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(new CartItem(product.id, product.name, product.imageUrl, product.unitPrice, 1));
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
  }
}
