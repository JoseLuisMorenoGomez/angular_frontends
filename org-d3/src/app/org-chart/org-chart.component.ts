// org-chart.component.ts

import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import { MatDialog } from '@angular/material/dialog';
import { HierarchyNode } from 'd3-hierarchy';
import { Subscription } from 'rxjs';

import { OrgChartDataService, D3NodeData } from './org-chart.data.service';
import { OrgSelectedNodeService } from './org-selected-node.service';
import { NodePopupComponent } from '../node-popup/node-popup.component';

import { ChartConstants, PagingConstants } from './chartConstants';
import { nodeContentTemplate, pagingButtomTemplate } from './chartTemplates';

const generateNodeContent = (d: HierarchyNode<D3NodeData>) => {
  return nodeContentTemplate
    .replace('{width}', ChartConstants.width)
    .replace('{height}', ChartConstants.height)
    .replace('{imageDiffVert}', ChartConstants.imageDiffVert)
    .replace('{backgroundColor}', ChartConstants.nodeBackgroundColor)
    .replace('{border}', ChartConstants.highlighted || ChartConstants.upToTheRootHighlighted ? ChartConstants.highlightedBorder : ChartConstants.defaultBorder)
    .replace('{id}', String(d.data.nodeId))
    .replace('{name}', d.data.name)
    .replace('{image}', d.data.image)
    .replace('{position}', d.data.position)
    .replace('{textColor}', ChartConstants.textColor);
};

const generatePagingButton = (d: HierarchyNode<D3NodeData>, state: any) => {
  const step = state.pagingStep(d.parent);
  const currentIndex = PagingConstants.pagingStep;
  const diff = 4;
  const min = Math.min(diff, step);
  return pagingButtomTemplate
    .replace('{min}', ChartConstants.min)
    .replace('{nodeBackgroundColor}', ChartConstants.nodeBackgroundColor);
};

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent implements AfterViewInit, OnDestroy {
  private chartDataSubscription: Subscription;

  private chart: OrgChart<D3NodeData>;
  private data: D3NodeData[];
  private chartConstants = ChartConstants;

  @ViewChild('chartContainer', { static: false }) chartContainerRef: ElementRef;

  constructor(
    private orgSelectedNodeService: OrgSelectedNodeService,
    private orgChartDataService: OrgChartDataService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.chartDataSubscription = this.orgChartDataService.getDepartmentList().subscribe((nodesData: D3NodeData[]) => {
      console.log(nodesData);
      this.data = nodesData;
      this.renderChart();
    });
  }

  ngOnDestroy() {
    if (this.chartDataSubscription) {
      this.chartDataSubscription.unsubscribe();
    }
  }

  private renderChart(): void {
    const chartContainer = this.chartContainerRef.nativeElement;

    this.chart = new OrgChart<D3NodeData>().container(chartContainer);

    if (this.data) {
      this.chart = new OrgChart<D3NodeData>()
        .data(this.data)
        .compact(false)
        .pagingStep((d) => 5)
        .minPagingVisibleNodes((d) => 4)
        .container(this.chartContainerRef.nativeElement)
        .svgWidth(800)
        .svgHeight(600)
        .onNodeClick((d) => {
          this.onSelectNode(d);
        })
        .pagingButton(generatePagingButton)
        .nodeWidth((d) => 160 + 2)
        .nodeHeight((d) => 100 + 25)
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 35)
        .compactMarginPair((d) => 30)
        .neighbourMargin((a, b) => 20)
        .nodeContent(generateNodeContent)
        .render();
    }
  }

  private onSelectNode(d3Node: HierarchyNode<D3NodeData>): void {
    console.log('onSelectNode Called! ' + d3Node.data.name);
    const selectedNode = d3Node.data;
    this.orgSelectedNodeService.setSelectedNode(selectedNode);
    this.orgChartDataService.getDepartmentById(selectedNode.nodeId).subscribe((nodeInfo: D3NodeData | null) => {
    
      if (nodeInfo) {
        console.log('NodeInfo: ');
        console.log(nodeInfo);
        this.openNodeInfoPopup(nodeInfo);
      }
    });
  }

  private openNodeInfoPopup(nodeInfo: D3NodeData): void {
    const dialogRef = this.dialog.open(NodePopupComponent, {
      width: '600px',
      height: '400px',
      data: { nodeInfo },
    });
  }
}


