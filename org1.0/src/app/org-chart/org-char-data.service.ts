// org-chart-data.service.ts

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface DepartmentNode {
  id: string;
  name: string;
  parent: {
    id: string;
  };
}

export interface OrgChartResponse {
  allOrgDepartments: DepartmentNode[];
}

@Injectable({
  providedIn: 'root',
})
export class OrgChartDataService {
  constructor(private apollo: Apollo) {}

  getHierarchy(): Observable<DepartmentNode[]> {
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
      .watchQuery<OrgChartResponse>({
        query: getHierarchy,
      })
      .valueChanges.pipe(map((result) => result.data.allOrgDepartments));
  }

  getDepartmentById(id: string): Observable<DepartmentNode> {
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
      .valueChanges.pipe(map((result) => result.data.allOrgDepartments[0]));
  }
}

