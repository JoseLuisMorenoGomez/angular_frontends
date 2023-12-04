import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrgChartDataService, DepartmentNode } from './org-chart.data.service';
import { HighchartsChartModule } from 'highcharts-angular';

import * as Highcharts from 'highcharts';
import HCSankey from 'highcharts/modules/sankey';
import HCOrganization from 'highcharts/modules/organization';


HCSankey(Highcharts);
HCOrganization(Highcharts);

@Component({
  selector: 'app-org-chart',
  standalone:true,
  imports: [HighchartsChartModule],
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})



export class OrgChartComponent implements OnInit {
  @ViewChild('chartContainer', { static: false }) chartContainerRef!: ElementRef;

  constructor(private orgChartDataService: OrgChartDataService) {
     }
  data: DepartmentNode[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
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

  ngOnInit(): void {
    this.orgChartDataService.getHierarchy().subscribe((orgData: DepartmentNode[]) => {
      this.data = orgData;
      console.log('Datos obtenido por el servicio: + orgData')
    ///  const chartContainer = this.chartContainerRef.nativeElement;
    ///  Highcharts.chart(chartContainer, this.chartOptions);
    });
  }

  mapSeriesData(data: DepartmentNode[]): { from: string; to: string }[] {
    const seriesData: { from: string; to: string }[] = [];
    data.forEach((node) => {
      seriesData.push({
        from: node.parent?.id ?? '?',
        to: node.id,
      });
    });
    return seriesData;
  }

  mapNodesData(data: DepartmentNode[]): { id: string; name: string }[] {
    const nodesData: { id: string; name: string }[] = [];
    data.forEach((node) => {
      nodesData.push({
        id: node.id,
        name: node.name,
      });
    });
    return nodesData;
  }

  
}

