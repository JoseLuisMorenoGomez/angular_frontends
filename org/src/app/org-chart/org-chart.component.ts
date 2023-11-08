import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { OrgChartService } from './org-chart.service';
import { Department } from './org-chart.models';
import { OrgChart } from "d3-org-chart";


@Component({
  selector: 'org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent implements OnInit, OnChanges {
  @ViewChild("chartContainer") chartContainer!: ElementRef;
  @Input() data: Department[] = [];
  chart: OrgChart<Department>;

  constructor(private orgChartService: OrgChartService) {}

  ngOnInit() {
    this.orgChartService.getDepartments().subscribe((result) => {
      this.data = result;
      console.log( 'Resultado del query: ' + result)
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
      .svgHeight(300)
      .svgWidth(500)
      .initialZoom(0.4)
      .onNodeClick(d => console.log(d + " node clicked"))
      .render();
    console.log("Data: "+ this.data)
  }
}
