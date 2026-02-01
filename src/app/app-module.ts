import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { App } from './app';
import { ProductList } from './component/product-list/product-list';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product-service';
import { provideRouter, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { routes } from './app.routes';
import { ProductCategoryMenu } from './component/product-category-menu/product-category-menu';
import { Search } from './component/search/search';
import { ProductDetails } from './component/product-details/product-details';
import { CartStatus } from './component/cart-status/cart-status';
import { CartDetails } from './component/cart-details/cart-details';

@NgModule({
  declarations: [
    App,
    ProductList,
    ProductCategoryMenu,
    Search,
    ProductDetails,
    CartStatus,
    CartDetails
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
    NgbModule
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    ProductService,
  ],
  bootstrap: [App]
})

export class AppModule { }
