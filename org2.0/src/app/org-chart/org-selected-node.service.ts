// selected-node.service.ts
// selected-node.service.ts
import { Injectable } from '@angular/core';
import { D3OrgChartNode } from './org-chart.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedNodeService {
  private selectedNodeSubject: BehaviorSubject<D3OrgChartNode | null> = new BehaviorSubject<D3OrgChartNode | null>(null);

  setSelectedNode(node: D3OrgChartNode): void {
    this.selectedNodeSubject.next(node);
  }

  getSelectedNode$(): Observable<D3OrgChartNode | null> {
    return this.selectedNodeSubject.asObservable();
  }
}
