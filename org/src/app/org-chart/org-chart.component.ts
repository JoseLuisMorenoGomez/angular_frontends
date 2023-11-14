import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OrgChartService, OrgNode } from './org-chart.service';
import { OrgChart } from 'd3-org-chart';
import { ORG_CHART_CONSTANTS } from './org-chart.constants';

interface D3OrgChartNode {
  nodeId: string;
  parentNodeId: string | null;
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

  // Usar ViewChild para obtener una referencia al elemento del DOM
  @ViewChild('chartContainer', { static: false }) chartContainerRef: ElementRef;

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
    // Acceder al contenedor utilizando la referencia de elemento
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

  // Función para mapear nodos de Graphql a nodos de D3  (id,parentId,name,..)
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
}
