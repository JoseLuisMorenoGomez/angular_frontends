// org-chart-data.service.ts

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



export interface DepartmentData {
  id: string;
  name: string;
  parent: {
    id: string;
  };
}

export interface OrgChartListResponse {
  allOrgDepartments: DepartmentData[];
}

export interface OrgChartResponse {
  orgDepartment: DepartmentData;
}

@Injectable({
  providedIn: 'root',
})
export class OrgChartDataService {
  constructor(private apollo: Apollo) {}

   getDepartmentList(): Observable<DepartmentData[]> {
    const  getDepartmentList = gql`
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
        query:  getDepartmentList,
      })
      .valueChanges.pipe(map((result) => result.data.allOrgDepartments)
      );
  }

  getDepartmentById(id: string): Observable<DepartmentData | null> {
    const getDepartmentByIdQuery = gql`
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
        query: getDepartmentByIdQuery,
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


