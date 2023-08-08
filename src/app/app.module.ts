import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth/auth.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ButtonModule } from 'primeng/button';
import { InfoComponent } from './info/info.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TweetComponent } from './tweet/tweet.component';

import { DialogModule } from 'primeng/dialog'; // p-dialog için DialogModule ekleniyor
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
 
    HomeComponent,
    InfoComponent,
    
    DashboardComponent,
          TweetComponent
    
    
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    RouterModule, 
    DialogModule,
  TableModule,
  CardModule
  ],
  providers: [
    AuthService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
