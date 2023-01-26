import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localRu from '@angular/common/locales/ru'

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { TestComponent } from './test/test.component'

registerLocaleData(localRu, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
