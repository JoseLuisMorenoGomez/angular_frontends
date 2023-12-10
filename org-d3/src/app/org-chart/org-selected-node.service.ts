import { Injectable } from '@angular/core';
import { D3NodeData } from './org-chart.data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgSelectedNodeService {
  private selectedNodeSubject: BehaviorSubject<D3NodeData | null> = new BehaviorSubject<D3NodeData | null>(null);

  setSelectedNode(node: D3NodeData): void {
    this.selectedNodeSubject.next(node);
  }

  getSelectedNode$(): Observable<D3NodeData | null> {
    return this.selectedNodeSubject.asObservable();
  }
}


