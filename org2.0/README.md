# Org

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

#
thon
Copy code
# Angular Org Chart Component

This Angular component (OrgChartComponent) integrates with D3.js to create an interactive organizational chart. The chart is populated with data obtained from the OrgChartService, which retrieves hierarchical data and converts it to a format compatible with D3.

## Usage

1. Install Dependencies

   Make sure to install the required dependencies by running:

   ```bash
   npm install d3 d3-org-chart
Component Setup

In your Angular component, import the necessary modules and services:

typescript
Copy code
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OrgChartService, OrgNode } from './org-chart.service';
import { OrgChart } from 'd3-org-chart';
import { ORG_CHART_CONSTANTS } from './org-chart.constants';
Component Definition

Define the OrgChartComponent class, implement the AfterViewInit interface, and set up the necessary properties and methods:

typescript
Copy code
@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements AfterViewInit {
  // ... (rest of the code)
}
ViewChild and Chart Container

Utilize ViewChild to obtain a reference to the chart container in the component:

typescript
Copy code
@ViewChild('chartContainer', { static: false }) chartContainerRef: ElementRef;
Constructor and ngAfterViewInit

Set up the constructor and ngAfterViewInit lifecycle hook to fetch organizational chart data and initiate the rendering process:

typescript
Copy code
constructor(private orgChartService: OrgChartService) {}

ngAfterViewInit(): void {
  setTimeout(() => {
    this.orgChartService.getOrgChart().subscribe((orgData: OrgNode[]) => {
      this.data = orgData;
      this.renderChart();
    });
  }, 100);
}
Render Chart

Implement the renderChart method to create and render the organizational chart using D3:

typescript
Copy code
private renderChart(): void {
  const chartContainer = this.chartContainerRef.nativeElement;

  this.chart = new OrgChart<D3OrgChartNode>().container(chartContainer);

  this.chart
    .data(this.mapToD3OrgChart(this.data))
    .nodeContent((node) => {
      return `<div class="chart-node">  
          ${node.data.name}
      </div>`;
    })
    .render();
}
Map to D3 Org Chart

Define the mapToD3OrgChart method to convert the hierarchical data to a format compatible with D3:

typescript
Copy code
private mapToD3OrgChart(nodes: OrgNode[]): D3OrgChartNode[] {
  const d3Nodes = nodes.map((node) => ({
    nodeId: node.id,
    parentNodeId: node.parent?.id || null,
    name: node.name || '',
    width: this.chartConstants.NODE_WIDTH,
    height: this.chartConstants.NODE_HEIGHT,
  }));
  return d3Nodes;
}
Styling

Style your chart nodes using CSS. For example, you can add the following style in org-chart.component.css:

css
Copy code
.chart-node {
  /* Add your styling here */
}
Run Your Application

Run your Angular application to see the organizational chart in action:

bash
Copy code
ng serve
Visit your application at http://localhost:4200/ to view the organizational chart.

Feel free to customize the component and styles according to your application's requirements.