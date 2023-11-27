// org-chart.component.ts

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import { HierarchyNode}from 'd3-hierarchy'
import { MatDialog } from '@angular/material/dialog';

import { ORG_CHART_CONSTANTS } from './org-chart.constants';
import { NodePopupComponent } from '../node-popup/node-popup.component';
import { OrgChartDataService, DepartmentNode } from './org-char-data.service';
import { OrgSelectedNodeService } from './org-selected-node.service';

export interface D3OrgChartNode {
  nodeId: string;
  parentNodeId: string | null;
  name: string;
  nodeWidth: number;
  nodeHeight: number;
}

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent implements AfterViewInit {
  private chart: OrgChart<D3OrgChartNode>;
  private data: DepartmentNode[];
  private chartConstants = ORG_CHART_CONSTANTS;

  @ViewChild('chartContainer', { static: false }) chartContainerRef: ElementRef;

  constructor(
    private orgSelectedNodeService: OrgSelectedNodeService,
    private orgChartDataService: OrgChartDataService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.orgChartDataService.getHierarchy().subscribe((orgData: DepartmentNode[]) => {
        this.data = orgData;
        this.renderChart();
      });
    }, 100);
  }

  private renderChart(): void {
    const chartContainer = this.chartContainerRef.nativeElement;
    
    this.chart = new OrgChart<D3OrgChartNode>().container(chartContainer);
    
    this.chart
      .data(this.mapToD3OrgChart(this.data))
      .nodeContent((node) => {
        return `<div class="chart-node">${node.data.name}</div>`;
      })
      .onNodeClick((d) => {
        this.onSelectNode(d);
      })
      .render();
      
    
  }

  private mapToD3OrgChart(nodes: DepartmentNode[]): D3OrgChartNode[] {
    console.log('Información del nodo:', nodes);
    const d3Nodes = nodes.map((node) => ({
      nodeId: node.id,
      parentNodeId: node.parent?.id || null,
      name: node.name || '',
      nodeWidth: this.chartConstants.NODE_WIDTH,
      nodeHeight: this.chartConstants.NODE_HEIGHT,
    }));
    return d3Nodes;
  }

  onSelectNode(node: HierarchyNode<D3OrgChartNode>): void {
    const d3Node: D3OrgChartNode = node.data;
    this.orgSelectedNodeService.setSelectedNode(d3Node);
    this.orgChartDataService.getDepartmentById(d3Node.nodeId).subscribe((nodeInfo) => {
      this.openNodeInfoPopup(nodeInfo);
    });
  }

  openNodeInfoPopup(nodeInfo: DepartmentNode): void {
    const dialogRef = this.dialog.open(NodePopupComponent, {
      width: '600px',
      height: '400px',
      data: { nodeInfo },
    });
  }
}



