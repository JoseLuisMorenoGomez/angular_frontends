// org-chart-data.service.ts

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ChartConstants } from './chartConstants';

import { OrgDepartmentFragment } from './chartFragments';

export interface OrgDepartment {
  id: number;
  name: string;
  parent: {
    id: number;
  };
  managerPosition: {
    name: string;
    orgpersonnelSet: {
      name: string;
      imageUrl: string;
    }[];
  };
}

export interface D3NodeData {
  nodeId: string;
  name: string;
  image: string;
  parentId?: string | null;
  position: string;
}

export interface OrgChartListResponse {
  allOrgDepartment: OrgDepartment[];
}

export interface OrgChartResponse {
  orgDepartmentById: OrgDepartment;
}

@Injectable({
  providedIn: 'root',
})
export class OrgChartDataService {
  private orgDepartmentFragment = OrgDepartmentFragment;

  constructor(private apollo: Apollo) {}

  getDepartmentList(): Observable<D3NodeData[]> {
    const getDepartmentListQuery = gql`
      query allOrgDepartment {
        allOrgDepartment {
          ...OrgDepartmentFragment
        }
      }
      ${this.orgDepartmentFragment}
    `;

    return this.apollo
      .watchQuery<OrgChartListResponse>({
        query: getDepartmentListQuery,
      })
      .valueChanges.pipe(
        map((result) => {
          const orgDepartments = result?.data?.allOrgDepartment || [];
          const data = this.mapToD3OrgChart(orgDepartments);
          return data;
        }),
      );
  }

  getDepartmentById(id: string): Observable<D3NodeData | null> {
    console.log('getDepartmentById Called. Id:', id);
    const getDepartmentByIdQuery = gql`
      query getDepartmentById($id: Int!) {
        orgDepartmentById(id: $id) {
          id
          name
          parent {
            id
          }
          managerPosition {
            name
            orgpersonnelSet {
              name
              imageUrl
            }
          }
        }
      }
    `;
  
    return this.apollo
      .watchQuery<OrgChartResponse>({
        query: getDepartmentByIdQuery,
        variables: {
          id: parseInt(id),
        },
      })
      .valueChanges.pipe(
        map((result) => {
                 
          if (result.errors) {
            console.error('GraphQL errors:', result.errors);
            return null;
          }
  
          const department = result.data?.orgDepartmentById;
  
          if (!department) {
            console.log('getDepartmentById. Department not found for ID:', id);
            console.log(result);
            return null;
          }
  
          const mappedData: D3NodeData = {
            nodeId: String(department.id),
            name: department.name,
            parentId: String(department.parent?.id) || '?',
            position: department.managerPosition?.name || '?',
            image:
              department.managerPosition?.orgpersonnelSet?.length > 0
                ? department.managerPosition.orgpersonnelSet[0].imageUrl
                : ChartConstants.fallbackImage,
          };
  
          console.log('getDepartmentById. Mapped Data:', mappedData);
          return mappedData;
        }),
        catchError((error) => {
          console.error('getDepartmentById. Error fetching department data:', error);
          return of(null);
        })
      );
  }
  

  private mapToD3OrgChart(nodes: OrgDepartment[]): D3NodeData[] {
    return nodes.map((node) => ({
      nodeId: String(node.id) ,
      name: node.name,
      parentId: node.parent?.id != null ? String(node.parent.id) : '',
      position: node.managerPosition?.name || '?',
      image:
        node.managerPosition?.orgpersonnelSet?.length > 0
          ? node.managerPosition.orgpersonnelSet[0].imageUrl
          : ChartConstants.fallbackImage,
    }));
  }
}
