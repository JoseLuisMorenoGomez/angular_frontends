// org-selected-node.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { D3OrgChartNode } from './org-chart.component';

@Injectable({
  providedIn: 'root',
})
export class OrgSelectedNodeService {
  private selectedNodeSubject: BehaviorSubject<D3OrgChartNode | null> = new BehaviorSubject<D3OrgChartNode | null>(null);

  setSelectedNode(node: D3OrgChartNode | null): void {
    this.selectedNodeSubject.next(node);
  }

  getSelectedNode$(): Observable<D3OrgChartNode | null> {
    return this.selectedNodeSubject.asObservable();
  }
}

