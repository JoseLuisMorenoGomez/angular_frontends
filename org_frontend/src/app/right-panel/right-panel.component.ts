import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrgSelectedNodeService } from '../org-chart/org-selected-node.service';
import { Subscription } from 'rxjs';
import { D3NodeData } from '../org-chart/org-chart.data.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit, OnDestroy {
  selectedNode: D3NodeData | null = null;  // Inicializa selectedNode como null
  private subscription: Subscription;

  constructor(private orgSelectedNodeService: OrgSelectedNodeService) {}

  ngOnInit() {
    this.subscription = this.orgSelectedNodeService.getSelectedNode$().subscribe((selectedNode) => {
      this.selectedNode = selectedNode
        ? {
            ...selectedNode,
            name: selectedNode.name !== null ? selectedNode.name : '', // Asegurando que 'name' no sea null
          }
        : null;
    });
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar posibles fugas de memoria
    this.subscription.unsubscribe();
  }
}

