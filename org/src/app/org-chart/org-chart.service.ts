import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Department } from './org-chart.models';

@Injectable({
  providedIn: 'root',
})
export class OrgChartService {
  constructor(private apollo: Apollo) {}

  getDepartments(): Observable<Department[]> {
    const GET_DEPARTMENTS = gql`
      query GetDepartments {
        allOrgDepartments {
            id
            name
            parent {
                id
            }        
        }
      }
    `;

    return this.apollo
      .watchQuery<{ departments: Department[] }>({
        query: GET_DEPARTMENTS,
      })
      .valueChanges.pipe(map((result) => result.data.departments));
  }
}
