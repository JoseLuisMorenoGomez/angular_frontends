import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Department, AllDepartmentsGQL } from './org-chart.service';

import { OrgChart } from "d3-org-chart";



@Component({
  selector: 'org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent implements OnInit {
  @ViewChild("chartContainer") chartContainer!: ElementRef;
  departments: Department[];
  @Input() data: any[];
  chart:OrgChart<any>;
  private subscription: Subscription;

  constructor(private AllDepartmentsGQL: AllDepartmentsGQL) {}

  ngOnInit() {
    this.subscription = this.AllDepartmentsGQL.fetch()
      .valueChanges
      .pipe(
        map(result => result.data.departments)
      )
      .subscribe(data => {
        this.departments = data;
        console.log("onInit(): " + data);
        this.updateChart();
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
        console.log("updateChart() : No data to render");     
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
    console.log("UpdateChart(). Data: "+ this.data)
  }
}
