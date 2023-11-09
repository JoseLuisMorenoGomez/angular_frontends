import { gql, Query } from 'apollo-angular';
import { Injectable } from '@angular/core';

export interface Department {
  id: string;
  name: string;
  parent: {
    id: string;
    name: string;
  };
}
export interface Response {
  departments: Department[];
}
 
@Injectable({
  providedIn: 'root',
})
export class AllDepartmentsGQL extends Query<Response> {
  override document = gql`
    query allDepartments {
      allOrgDepartments {
        id
        name
        parent {
          id
          name
        }
      }
    }
  `;
}