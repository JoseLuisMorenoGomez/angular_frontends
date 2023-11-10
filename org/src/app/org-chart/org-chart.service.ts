import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgChartService {
  private orgChartUrl = 'https://graphene.pepelui.es/graphql/'; // La URL de tu servidor GraphQL

  constructor(private http: HttpClient) {}

  getOrgChart(): Observable<any> {
    const query = `
      query MyQuery {
        allOrgDepartments {
          orgdepartmentSet {
            id
            name
          }
        }
      }
    `;

    return this.http.post(this.orgChartUrl, { query });
  }
}


