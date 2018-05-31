import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { AppService } from './app.service';

import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';




@NgModule({
  declarations: [
    AppComponent,

    ContactComponent,

    MenuComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Ng2CarouselamosModule,
    // appRoutiingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
