import { AfterViewInit, Component } from '@angular/core';
import { OrgChartService, OrgNode } from './org-chart.service';
import { HierarchyNode } from 'd3';
import { ORG_CHART_CONSTANTS } from './org-chart.constants';
import { OrgChart } from 'd3-org-chart';

interface D3OrgChartNode {
  nodeId: string;
  parentNodeId: string| null;
  name: string;
  width: number;
  height: number;
  // ... (resto del código)
}


@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements AfterViewInit {
  private chart: OrgChart<D3OrgChartNode>;
  private data: OrgNode[]; // Usar la interfaz de nodos aplanados
  private chartConstants = ORG_CHART_CONSTANTS;

  constructor(private orgChartService: OrgChartService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.orgChartService.getOrgChart().subscribe((orgData: OrgNode[]) => {
        this.data = orgData;
        this.renderChart();
      });
    }, 100);
  }

  private renderChart(): void {
    console.log( "renderChart called!");
    const chartContainer = document.querySelector('.chart-container');

   
    this.chart = new OrgChart<D3OrgChartNode>().container('.chart-container');

    this.chart
      .data(this.mapToD3OrgChart(this.data))
      .render();
      
    console.log(this.chart.data);
  }
  // Función para mapear nodos aplanados a nodos de D3
  private mapToD3OrgChart(nodes: OrgNode[]): D3OrgChartNode[] {
    return nodes.map((node) => ({
      nodeId: `O-${node.id}`,
      parentNodeId: node.parentId,
      name: node.name,
      width: this.chartConstants.NODE_WIDTH,
      height: this.chartConstants.NODE_HEIGHT,
  
    }));
  }
}
