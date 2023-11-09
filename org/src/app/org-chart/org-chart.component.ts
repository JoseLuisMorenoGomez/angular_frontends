import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgChart } from 'd3-org-chart';
import { Department, AllDepartmentsGQL, Response } from './org-chart.service'; // Asegúrate de importar Response

@Component({
  selector: 'org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent implements OnInit {
  @ViewChild("chartContainer") chartContainer!: ElementRef;
  departments: Observable<Department[]>;
  @Input() data: Department[] = [];
  chart: OrgChart<any>;

  constructor(private AllDepartmentsGQL: AllDepartmentsGQL) {}

  ngOnInit() {
    this.departments = this.AllDepartmentsGQL.fetch() 
      .pipe(
        map((result) => result.data.departments)
      );
      
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
      console.log("updateChart(): no data to render");
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
      .render();
    console.log("UpdateChart(). Data: " + this.data);
  }
}

