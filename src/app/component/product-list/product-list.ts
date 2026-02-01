import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})

export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryName: string = "All";
  searchMode: boolean = false;
  currentKeyword: string = "";
  previousCategoryId: number = -1;

  // pagination properties
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.listProducts();

  }

  addToCart(product: Product) {
    this.cartService.addToCart(new CartItem(product.id, product.name, product.imageUrl, product.unitPrice, 1));
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
  }

  listProducts() {
    this.route.paramMap.pipe(
      map(params => {
        const keyword = params.get('keyword');
        const categoryId = params.get('id');
        const categoryName = params.get('name');

        return {
          searchMode: !!keyword,
          keyword: keyword || "",
          categoryId: categoryId ? +categoryId : this.previousCategoryId,
          categoryName: categoryName || this.currentCategoryName,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        };
      }),
      switchMap(routeData => {
        this.searchMode = routeData.searchMode;

        if (routeData.searchMode) {
          if (this.currentKeyword != routeData.keyword) {
            this.pageNumber = 1;
          }

          this.currentKeyword = routeData.keyword;

          return this.productService.searchProductPaginate(routeData.pageNumber - 1, routeData.pageSize, routeData.keyword);
        } else {
          if (this.previousCategoryId != routeData.categoryId) {
            this.pageNumber = 1;
          }

          this.previousCategoryId = routeData.categoryId;
          this.currentCategoryName = routeData.categoryName;

          return this.productService.getProductListPaginate(routeData.pageNumber - 1, routeData.pageSize, routeData.categoryId);
        }
      })
    ).subscribe(data => {
      this.products = data._embedded.products;
      this.totalElements = data.page.totalElements;
      this.pageSize = data.page.size;
      this.pageNumber = data.page.number + 1;
      this.cdr.detectChanges();
    });
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }
}



