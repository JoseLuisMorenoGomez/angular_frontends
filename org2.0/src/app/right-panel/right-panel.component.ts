// right-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { SelectedNodeService } from '../org-chart/org-selected-node.service';
import { Subscription } from 'rxjs';
import { D3OrgChartNode } from '../org-chart/org-chart.component';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  selectedNode: D3OrgChartNode | null;
  private subscription: Subscription;

  constructor(private selectedNodeService: SelectedNodeService) {}

  ngOnInit() {
    this.subscription = this.selectedNodeService.getSelectedNode$().subscribe((selectedNode) => {
      this.selectedNode = selectedNode;
      // Otras acciones según sea necesario
    });
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar posibles fugas de memoria
    this.subscription.unsubscribe();
  }
}
