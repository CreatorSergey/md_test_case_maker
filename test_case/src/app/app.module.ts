import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localRu from '@angular/common/locales/ru';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { TestComponent } from './test/test.component';
import { CaseMakerComponent } from './case-maker/case-maker.component';

registerLocaleData(localRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormComponent,
    TestComponent,
    CaseMakerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatTreeModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
