import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { QuestionsComponent } from './questions/questions.component';
import { LoaderService } from './services/loader.service';
import { QuestionsService } from './services/questions.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { FilterPipe} from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    QuestionsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    LoaderService,
    QuestionsService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
