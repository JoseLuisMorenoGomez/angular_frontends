import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { OrgChartDataService } from './org-chart/org-char-data.service';

@NgModule({
  imports: [BrowserModule, ApolloModule, HttpClientModule,MatDialogModule],
  declarations: [AppComponent, OrgChartComponent ],
  bootstrap: [AppComponent],
  providers: [
     OrgChartDataService,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://graphene.pepelui.es/graphql/',
          }),
        };
      },
      deps: [HttpLink],
    },
  ]
})

export class AppModule {};