import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { ProductList } from './component/product-list/product-list';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product-service';
import { provideRouter, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    App,
    ProductList
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive
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
