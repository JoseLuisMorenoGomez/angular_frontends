import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface graphqlData {
  id: string;
  name: string;
  parent: {
    id: string;
  };
  managerPosition: {
    id: string;
    name: string;
  };
}

export interface D3NodeData {
  nodeId: string;
  name: string;
  parentId?: string | null;
  position: any;
}

export interface OrgChartListResponse {
  allOrgDepartments: graphqlData[];
}

export interface OrgChartResponse {
  orgDepartment: graphqlData;
}

@Injectable({
  providedIn: 'root',
})
export class OrgChartDataService {
  constructor(private apollo: Apollo) {}

  getHierarchy(): Observable<D3NodeData[]> {
    const getHierarchy = gql`
      query getAllDepartmentQuery {
        allOrgDepartments {
          id
          parent {
            id
            name
          }
          name
          managerPosition {
            id
            name
          }
        }
      }
    `;

    return this.apollo
      .watchQuery<OrgChartListResponse>({
        query: getHierarchy,
      })
      .valueChanges.pipe(
        map((result) => {
          const data = this.mapToD3OrgChart(result.data.allOrgDepartments);
          console.log('OrgChartListResponse:', data);
          return data;
        }),
      );
  }

  getDepartmentById(id: string): Observable<D3NodeData | null> {
    const getDepartmentByIDQuery = gql`
      query getDepartmentByID($id: ID!) {
        orgDepartment(id: $id) {
          id
          name
          parent {
            id
          }
          managerPosition {
            id
            name
          }
        }
      }
    `;

    return this.apollo
      .watchQuery<OrgChartResponse>({
        query: getDepartmentByIDQuery,
        variables: {
          id: id,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          const data: D3NodeData = {
            nodeId: result.data.orgDepartment.id,
            name: result.data.orgDepartment.name,
            parentId: result.data.orgDepartment.parent?.id || null,
            position: result.data.orgDepartment.managerPosition.name,
          };
          console.log('OrgChartResponse:', data);
          return data;
        }),
        catchError((error) => {
          console.error('Error fetching department data:', error);
          return of(null);
        })
      );
  }

  private mapToD3OrgChart(nodes: graphqlData[]): D3NodeData[] {
    return nodes.map((node) => ({
      nodeId: node.id,
      name: node.name,
      parentId: node.parent?.id || null,
      position: node.managerPosition?.name || '?'
    }));
  }
}

