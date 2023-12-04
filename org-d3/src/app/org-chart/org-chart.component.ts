// org-chart.component.ts

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import { MatDialog } from '@angular/material/dialog';
import { HierarchyNode } from 'd3-hierarchy';

import { ORG_CHART_CONSTANTS } from './org-chart.constants';
import { NodePopupComponent } from '../node-popup/node-popup.component';
import { OrgChartDataService, DepartmentNode } from './org-chart.data.service';
import { OrgSelectedNodeService } from './org-selected-node.service';
import { select } from 'd3';

export interface OrgChartNode {
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
  private chart: OrgChart<OrgChartNode>;
  private data: DepartmentNode[];
  private chartConstants = ORG_CHART_CONSTANTS;

  @ViewChild('chartContainer', { static: false }) chartContainerRef: ElementRef;

  constructor(
    private orgSelectedNodeService: OrgSelectedNodeService,
    private orgChartDataService: OrgChartDataService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.orgChartDataService.getHierarchy().subscribe((orgData: DepartmentNode[]) => {
      this.data = orgData;
      this.renderChart();
    });
  }

  private renderChart(): void {
    const chartContainer = this.chartContainerRef.nativeElement;

    this.chart = new OrgChart<OrgChartNode>().container(chartContainer);

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

  private mapToD3OrgChart(nodes: DepartmentNode[]): OrgChartNode[] {
    const orgChartNodes = nodes.map((node) => ({
      nodeId: node.id,
      parentNodeId: node.parent?.id || null,
      name: node.name || '',
      nodeWidth: this.chartConstants.NODE_WIDTH,
      nodeHeight: this.chartConstants.NODE_HEIGHT,
      // Otras propiedades que puedas necesitar
    }));
    return orgChartNodes;
  }

  onSelectNode(d3Node: HierarchyNode<OrgChartNode>): void {
    const selectedNode = d3Node.data;
    this.orgSelectedNodeService.setSelectedNode(selectedNode);
    
    this.orgChartDataService.getDepartmentById(selectedNode.nodeId).subscribe((nodeInfo) => {
      if (nodeInfo) {
        this.openNodeInfoPopup(nodeInfo);
      }
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

