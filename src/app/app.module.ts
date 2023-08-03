import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fakeBackendProvider } from './interceptors/fake-backend.interceptor';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ProductDetailModalComponent } from './pages/product-detail-modal/product-detail-modal.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ProductListComponent, ProductDetailModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    fakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
