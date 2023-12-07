// selected-node.service.ts

import { Injectable } from '@angular/core';
import { OrgChartNodeData } from './org-chart.data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NodePopupComponent } from '../node-popup/node-popup.component'

@Injectable({
  providedIn: 'root',
})
export class OrgSelectedNodeService {
  private selectedNodeSubject: BehaviorSubject<OrgChartNodeData | null> = new BehaviorSubject<OrgChartNodeData | null>(null);

  setSelectedNode(node: OrgChartNodeData): void {
    this.selectedNodeSubject.next(node);
  }

  getSelectedNode$(): Observable<OrgChartNodeData | null> {
    return this.selectedNodeSubject.asObservable();
  }
}


