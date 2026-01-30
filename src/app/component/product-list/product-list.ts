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
  searchMode: boolean = false;
  currentKeyword: string = "";

  constructor(private productService: ProductService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => {
        const keyword = params.get('keyword');
        const categoryId = params.get('id');
        const categoryName = params.get('name');

        return {
          searchMode: !!keyword,
          keyword: keyword || "",
          categoryId: categoryId ? +categoryId : -1,
          categoryName: categoryName || "All"
        };
      }),
      switchMap(routeData => {
        this.searchMode = routeData.searchMode;

        if (routeData.searchMode) {
          this.currentKeyword = routeData.keyword;
          return this.productService.searchProducts(routeData.keyword);
        } else {
          this.currentCategoryName = routeData.categoryName;
          return this.productService.getProductList(routeData.categoryId);
        }
      })
    ).subscribe(products => {
      this.products = products;
      this.cdr.detectChanges();
    });

    // this.route.paramMap.subscribe(params => {
    //   this.searchMode = params.has('keyword');

    //   // this.searchMode = this.route.snapshot.paramMap.has('keyword');
    //   if (this.searchMode) {
    //     const keyword = params.get('keyword')!;
    //     this.currentKeyword = keyword;
    //     this.handleSearchProducts(keyword);
    //   } else {
    //     const categoryId = params.has('id') ? +params.get('id')! : -1;
    //     this.currentCategoryName = params.get('name') ?? "All";
    //     this.handleListProducts(categoryId);
    //   }
    // });
  }

  // handleListProducts(categoryId: number) {
  //   this.productService.getProductList(categoryId).subscribe(products => {
  //     this.products = products;
  //   });
  // }

  // handleSearchProducts(keyword: string) {
  //   this.productService.searchProducts(keyword).subscribe(products => {
  //     this.products = products;
  //   });
  // }
}
