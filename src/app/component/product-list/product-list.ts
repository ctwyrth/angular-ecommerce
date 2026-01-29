import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})

export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryName: string = "All";
  // currentCategoryId: number = 1;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      // map(params => params.has('id') ? +params.get('id')! : -1),
      map(params => {
        if (params.has('id')) {
          this.currentCategoryName = params.get('name')!;
          return +params.get('id')!;
        } else {
          return -1;
        }
      }),

      switchMap(categoryId => this.productService.getProductList(categoryId))
    ).subscribe(products => {
      this.products = products;
      this.cdr.detectChanges();
    });
  }


  // listProducts(params: ParamMap) {

  //   // check if id param is available
  //   const hasCategory: boolean = params.has('id');

  //   if (hasCategory) {
  //     this.currentCategoryId = +params.get('id')!;
  //   } else {
  //     this.currentCategoryId = -1;
  //   }

  //   console.log(this.currentCategoryId);

  //   this.productService.getProductList(this.currentCategoryId).subscribe(data => {
  //     this.products = data;
  //     console.log(data);
  //   })
  // }

}
