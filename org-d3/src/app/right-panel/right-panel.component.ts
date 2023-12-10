import { Component, OnInit } from '@angular/core';
import { OrgSelectedNodeService } from '../org-chart/org-selected-node.service';
import { Subscription } from 'rxjs';
import { D3NodeData } from '../org-chart/org-chart.data.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  selectedNode: D3NodeData | null;
  private subscription: Subscription;

  constructor(private orgSelectedNodeService: OrgSelectedNodeService) {}

  ngOnInit() {
    this.subscription = this.orgSelectedNodeService.getSelectedNode$().subscribe((selectedNode) => {
      if (selectedNode) {
        this.selectedNode = selectedNode;
      } else {
        this.selectedNode = null;
      }
    });
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar posibles fugas de memoria
    this.subscription.unsubscribe();
  }
}


