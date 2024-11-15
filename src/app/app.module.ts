import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './intercept.service';
import { ErrorInterceptorService } from './error-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ProfileComponent,
    ReportIssueComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptorService,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
