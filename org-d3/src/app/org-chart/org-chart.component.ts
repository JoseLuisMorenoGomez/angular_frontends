import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import { MatDialog } from '@angular/material/dialog';
import { HierarchyNode } from 'd3-hierarchy';

import { OrgChartDataService, OrgChartNodeData } from './org-chart.data.service';
import { OrgSelectedNodeService } from './org-selected-node.service';
import { NodePopupComponent } from '../node-popup/node-popup.component';

// Importa las constantes del gráfico y la plantilla del contenido del nodo
import { ChartConstants } from './chartConstants';
import { nodeContentTemplate, pagingButtomTemplate } from './nodeTemplates';


// Función para generar contenido del nodo
const generateNodeContent = (d:HierarchyNode<OrgChartNodeData>) => {
  const template = nodeContentTemplate
    .replace('{width}', ChartConstants.width)
    .replace('{height}', ChartConstants.height)
    .replace('{imageDiffVert}', ChartConstants.imageDiffVert)
    .replace('{backgroundColor}', ChartConstants.nodeBackgroundColor)
    .replace('{border}', d.data._highlighted || ChartConstants.upToTheRootHighlighted ? ChartConstants.highlightedBorder : ChartConstants.defaultBorder)
    .replace('{id}', d.data.id)
    .replace('{image}', d.data.image)
    .replace('{name}', d.data.name)
    .replace('{position}', d.data.position)
    .replace('{textColor}', ChartConstants.textColor);

  return template;
};

// Función para generar el botón de paginación
const generatePagingButton = (d:HierarchyNode<OrgChartNodeData>, state:any) => {
  const step = state.pagingStep(d.parent);
  const currentIndex = d.parent.data._pagingStep;
  const diff = d.parent.data._directSubordinatesPaging - currentIndex;
  const min = Math.min(diff, step);
  const template = pagingButtomTemplate
    .replace('{min}', ChartConstants.min)
    .replace('{nodeBackgroundColor}', ChartConstants.nodeBackgroundColor)  
  return template;
};

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent implements AfterViewInit {
  private chart: OrgChart<OrgChartNodeData>;
  private data: OrgChartNodeData[];
  private chartConstants = ChartConstants;

  @ViewChild('chartContainer', { static: false }) chartContainerRef: ElementRef;

  constructor(
    private orgSelectedNodeService: OrgSelectedNodeService,
    private orgChartDataService: OrgChartDataService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.orgChartDataService.getHierarchy().subscribe((nodesData: OrgChartNodeData[]) => {
      this.data = nodesData;
      this.renderChart();
    });
  }

  ngOnDestroy() {
    //TODO: De-suscribirse para evitar posibles fugas de memoria
  
  }

  private renderChart(): void {
    if (this.data) {
      this.chart = new OrgChart<OrgChartNodeData>()
        .compact(false)
        .pagingStep((d) => 5)
        .minPagingVisibleNodes((d) => 14)
        .container(this.chartContainerRef.nativeElement)
        .svgWidth(800)
        .svgHeight(600)
        .data(this.data)
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

  private onSelectNode(d3Node: HierarchyNode<OrgChartNodeData>): void {
    const selectedNode = d3Node.data;
    this.orgSelectedNodeService.setSelectedNode(selectedNode);

    this.orgChartDataService.getDepartmentById(selectedNode.id).subscribe((nodeInfo) => {
      if (nodeInfo) {
        this.openNodeInfoPopup(nodeInfo);
      }
    });
  }

  private openNodeInfoPopup(nodeInfo: OrgChartNodeData): void {
    const dialogRef = this.dialog.open(NodePopupComponent, {
      width: '600px',
      height: '400px',
      data: { nodeInfo },
    });
  }
}

