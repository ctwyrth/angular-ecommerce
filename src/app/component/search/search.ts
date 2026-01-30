import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css',
})

export class Search implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // this.route.paramMap.subscribe((params) => {
    //   const keyword = params.get('keyword');
    //   if (keyword) {
    //     this.handleSearch(keyword);
    //   }
    // });
  }

  doSearch(value: String) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  // handleSearch(keyword: string) {
  //   console.log(`Searching for products with keyword: ${keyword}`);
  //   ProductList.handleSearchProducts();
  // }
}
