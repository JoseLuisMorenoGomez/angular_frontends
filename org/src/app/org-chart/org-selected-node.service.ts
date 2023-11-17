// selected-node.service.ts

import { Injectable } from '@angular/core';
import { D3OrgChartNode } from './org-chart.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NodePopupComponent } from '../node-popup/node-popup.component'

@Injectable({
  providedIn: 'root'
})

// Señalizar el nodo como seleccionado  

export class SelectedNodeService {
  private selectedNodeSubject: BehaviorSubject<D3OrgChartNode | null> = new BehaviorSubject<D3OrgChartNode | null>(null);

  setSelectedNode(node: D3OrgChartNode): void {
    this.selectedNodeSubject.next(node);
  }

  getSelectedNode$(): Observable<D3OrgChartNode | null> {
    return this.selectedNodeSubject.asObservable();
  }
}


@Injectable({
  providedIn: 'root',
})
// Proveer de la información disponible 

export class GraphqlService {
    constructor(private apollo: Apollo) {}
  
    getNodeInfo(nodeId: string): Observable<Document> {
     
      const getDepartmentByIDQuery = gql`
        query getDepartmentByID($id: ID!) {
          orgDepartment(id: $id) {
                      id
                      name

          }
        }
      `;
      
      // Ejecuta la consulta con la variable id
      return this.apollo.watchQuery({
        query: getDepartmentByIDQuery,
        variables: {
          id: nodeId
        }
      }).valueChanges
        .pipe(
          map(result => result.data as Document)
        );
       
    }
   
  }
