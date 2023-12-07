import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrgChartDataService, DepartmentData } from './org-chart.data.service';
import * as Highcharts from 'highcharts';
import HCSankey from 'highcharts/modules/sankey';
import HCOrganization from 'highcharts/modules/organization';

HCSankey(Highcharts);
HCOrganization(Highcharts);

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})

export class OrgChartComponent implements OnInit {
  @ViewChild('chartContainer', { static: false }) chartContainerRef!: ElementRef;

  data: DepartmentData[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  constructor(private orgChartDataService: OrgChartDataService) {}

  ngOnInit(): void {
    this.orgChartDataService.getHierarchy().subscribe((orgData: DepartmentData[]) => {
      this.data = orgData;
      this.updateChart();
    });
  }

  updateChart(): void {
    const chartOptions: Highcharts.Options = {
      title: {
        text: 'Ayuntamiento de Jerez',
        style: {
          fontSize: '24px',
        },
      },
      chart: {
        height: 400,
        width: 1200,
        inverted: true,
      },
      series: [
        {
          type: 'organization',
          name: 'Ayuntamiento',
          keys: ['from', 'to'],
          data: this.mapSeriesData(this.data),
          point: {
            events: {
              click: function () {
                console.log(this.name);
              },
            },
          },
          nodes: this.mapNodesData(this.data),
        },
      ],
    };

    // Renderizar el gráfico
    const chartContainer = this.chartContainerRef.nativeElement;
    Highcharts.chart(chartContainer, chartOptions);
  }

  mapSeriesData(data: DepartmentData[]): { from: string; to: string }[] {
    return data.map((node) => ({
      from: node.parent?.id ?? '',
      to: node.id,
    }));
  }

  mapNodesData(data: DepartmentData[]): { id: string; title: string }[] {
    return data.map((node) => ({
      id: node.id,
      title: node.name,
    }));
  }
}






