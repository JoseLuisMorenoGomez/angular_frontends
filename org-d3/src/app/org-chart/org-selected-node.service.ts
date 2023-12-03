// selected-node.service.ts

import { Injectable } from '@angular/core';
import { OrgChartNode } from './org-chart.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NodePopupComponent } from '../node-popup/node-popup.component'

@Injectable({
  providedIn: 'root',
})
export class OrgSelectedNodeService {
  private selectedNodeSubject: BehaviorSubject<OrgChartNode | null> = new BehaviorSubject<OrgChartNode | null>(null);

  setSelectedNode(node: OrgChartNode): void {
    this.selectedNodeSubject.next(node);
  }

  getSelectedNode$(): Observable<OrgChartNode | null> {
    return this.selectedNodeSubject.asObservable();
  }
}


