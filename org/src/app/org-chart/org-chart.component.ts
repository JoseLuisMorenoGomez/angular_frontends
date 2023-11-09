import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
  departments: Observable<Department[]>;
  @Input() data: any[];
  chart:OrgChart<any>;

  constructor(private AllDepartmentsGQL: AllDepartmentsGQL) {}

  ngOnInit() {
    this.departments = this.AllDepartmentsGQL.watch({
      first: 10
    }, {
      fetchPolicy: 'network-only'
    })
      .valueChanges
      .pipe(
        map(result => result.data.departments)
      );
      console.log("OnInit():")
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
      console.log("UpdateChart. No hay datos")
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
    console.log("UpdateChart. Data: "+ this.data)
  }
}
