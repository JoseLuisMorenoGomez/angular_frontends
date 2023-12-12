// org-selected-node.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { D3NodeData } from './org-chart.data.service';

@Injectable({
  providedIn: 'root',
})
export class OrgSelectedNodeService {
  private selectedNodeSubject: BehaviorSubject<D3NodeData | null> = new BehaviorSubject<D3NodeData | null>(null);

  /**
   * Set the selected node.
   * @param node The node to set as selected.
   */
  setSelectedNode(node: D3NodeData): void {
    this.selectedNodeSubject.next(node);
  }

  /**
   * Get the observable for the selected node.
   * @returns Observable that emits the selected node.
   */
  getSelectedNode$(): Observable<D3NodeData | null> {
    return this.selectedNodeSubject.asObservable();
  }
}







