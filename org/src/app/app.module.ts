import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments.component';
 
@NgModule({
  imports: [BrowserModule, ApolloModule, HttpClientModule],
  declarations: [AppComponent, DepartmentsComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://backend.pepelui.es/graphql/',
          }),
        };
      },
      deps: [HttpLink],
    },
  ]
})

export class AppModule {};