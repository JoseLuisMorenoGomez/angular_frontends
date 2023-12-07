// right-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { OrgSelectedNodeService } from '../org-chart/org-selected-node.service';
import { Subscription } from 'rxjs';
import { OrgChartNodeData } from '../org-chart/org-chart.data.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  selectedNode: OrgChartNodeData | null;
  private subscription: Subscription;

  constructor(private OrgSelectedNodeService: OrgSelectedNodeService) {}

  ngOnInit() {
    this.subscription = this.OrgSelectedNodeService.getSelectedNode$().subscribe((selectedNode) => {
      this.selectedNode = selectedNode;
      // Otras acciones según sea necesario
    });
  }

  ngOnDestroy() {
    // Importante: De-suscribirse para evitar posibles fugas de memoria
    this.subscription.unsubscribe();
  }
}
