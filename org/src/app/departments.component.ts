import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
 
// We use the gql tag to parse our query string into a query document
const GET_DEPARTMENTS = gql`
  query allOrgDepartments {
    allOrgDepartments {
      id
      name
    }
  }
`;
 
@Component({
  selector: 'Departments',
  template: `
    <h3> Listado de departamentos obtenidos de la API Graphql</h3>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error : {{error}}(</div>
    <div *ngIf="Departments">
      <div *ngFor="let Department of Departments">
        <p>{{ Department.id }}: {{ Department.name }}</p>
      </div>
    </div>
  `,
})

export class DepartmentsComponent implements OnInit, OnDestroy {
  Departments: any[];
  loading = true;
  error: any;
 
  private querySubscription: Subscription;
 
  constructor(private apollo: Apollo) {}
 
  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_DEPARTMENTS,
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.Departments = data.allOrgDepartments;
        this.error = error;
      });
  }
 
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
