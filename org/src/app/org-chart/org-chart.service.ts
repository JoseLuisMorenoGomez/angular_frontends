import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface OrgNode {
  id: string;
  parentId:string;
  name: string;
}

export interface OrgChartResponse {
  allOrgDepartments: OrgNode[];
}

@Injectable({
  providedIn: 'root',
})
export class OrgChartService {
  constructor(private apollo: Apollo) {}

  getOrgChart(): Observable<OrgNode[]> {
    return this.apollo
      .query<OrgChartResponse>({
        query: gql`
          query MyQuery {
            allOrgDepartments {
              id
              parentId: parent {
                id
              }
            name
  }
}
        `,
      })
      .pipe(
        tap((response) => {
          console.log('Data from GraphQL:', response.data.allOrgDepartments);
        }),
        map((response) => {
          return response.data.allOrgDepartments
        })
      );
  }


}















