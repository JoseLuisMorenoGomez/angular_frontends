import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrgSelectedNodeService} from './org-chart/org-selected-node.service';
import { OrgChartDataService } from './org-chart/org-chart.data.service';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [BrowserModule, ApolloModule, HttpClientModule,MatDialogModule,],
  declarations: [AppComponent,
                 OrgChartComponent, RightPanelComponent, LeftPanelComponent,HeaderComponent, FooterComponent],
  bootstrap: [AppComponent],
  providers: [
    OrgSelectedNodeService,
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