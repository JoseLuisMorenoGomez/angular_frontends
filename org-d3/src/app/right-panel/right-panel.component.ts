// right-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { OrgSelectedNodeService } from '../org-chart/org-selected-node.service';
import { Subscription } from 'rxjs';
import { OrgChartNode } from '../org-chart/org-chart.component';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  selectedNode: OrgChartNode | null;
  private subscription: Subscription;

  constructor(private OrgSelectedNodeService: OrgSelectedNodeService) {}

  ngOnInit() {
    this.subscription = this.OrgSelectedNodeService.getSelectedNode$().subscribe((selectedNode) => {
      this.selectedNode = selectedNode;
      // Otras acciones según sea necesario
    });
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar posibles fugas de memoria
    this.subscription.unsubscribe();
  }
}
