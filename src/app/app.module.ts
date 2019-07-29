import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InterceptorOne } from './interceptors/interceptor-one';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorOne, multi: true}
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
