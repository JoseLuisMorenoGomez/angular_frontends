import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrgChartDataService } from './org-chart/org-chart.data.service';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  imports: [BrowserModule, ApolloModule, HttpClientModule, HighchartsChartModule],
  declarations: [AppComponent],
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
  //  { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },
  ]
})

export class AppModule {};