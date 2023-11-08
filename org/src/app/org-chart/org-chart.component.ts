import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  OnChanges,
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";
import { OrgChart } from 'd3-org-chart';

 
// We use the gql tag to parse our query string into a query document
const GET_DEPARTMENTS = gql`
      query MyQuery {
        allOrgDepartments {
          name
        }
}
`;
 
@Component({
  selector: 'organigrama',
  template: `
    <h3> Organigrama con datos obtenidos de la API Graphql</h3>
    <div #chartContainer id="chartContainer"></div>
  `,
})

export class orgcharComponent implements OnInit, OnChanges, OnDestroy {
  Departments: any[];
  loading = true;
  error: any;
 
  const chart = new OrgChart()
                    .data(ourData)
                    .container(ourDomElementOrCssSelector)
                    .duration(ourDuration)
                    .render()


// We can keep chaining values in runtime
chart.data(updatedData).render()


  private querySubscription: Subscription;
 
  constructor(private apollo: Apollo) { chart: OrgChart}
 
  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_DEPARTMENTS,
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.Departments = data.allOrgDepartments;
        this.error = error;
      });
  }

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return; 
    }
    if (!this.chart) {
      return; 
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .svgWidth(500)
      .initialZoom(0.4)
      .onNodeClick(d => console.log(d + " node clicked"))
      .render();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}