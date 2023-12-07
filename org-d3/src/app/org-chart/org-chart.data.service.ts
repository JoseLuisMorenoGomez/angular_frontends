// org-chart-data.service.ts

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



export interface OrgChartNodeData {
  id: string;
  name: string;
  parent: {
    id: string;
  };
}

export interface OrgChartListResponse {
  allOrgDepartments: OrgChartNodeData[];
}

export interface OrgChartResponse {
  orgDepartment: OrgChartNodeData;
}

@Injectable({
  providedIn: 'root',
})
export class OrgChartDataService {
  constructor(private apollo: Apollo) {}

  getHierarchy(): Observable<OrgChartNodeData[]> {
    const getHierarchy = gql`
      query getAllDepartmentQuery {
        allOrgDepartments {
          id
          parent {
            id
          }
          name
        }
      }
    `;

    return this.apollo
      .watchQuery<OrgChartListResponse>({
        query: getHierarchy,
      })
      .valueChanges.pipe(map((result) => result.data.allOrgDepartments)
      );
  }

  getDepartmentById(id: string): Observable<OrgChartNodeData | null> {
    const getDepartmentByIDQuery = gql`
      query getDepartmentByID($id: ID!) {
        orgDepartment(id: $id) {
          id
          name
          parent {
            id
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
      .valueChanges.pipe(map((result) => result.data.orgDepartment),
        catchError((error) => {
          console.error('Error fetching department data:', error);
          return of(null);
        })
      );
  }
 
  
}


