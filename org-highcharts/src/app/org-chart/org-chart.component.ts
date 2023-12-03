import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_ORG_DATA = gql`
  query {
    // Tu consulta GraphQL para obtener los datos del organigrama
  }
`;

@Component({
  selector: 'app-organigrama',
  template: '<div [chart]="chart"></div>',
})
export class OrganigramaComponent implements OnInit {
  chart: Chart;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apollo
      .watchQuery({
        query: GET_ORG_DATA,
      })
      .valueChanges.subscribe((result) => {
        // Procesar los datos y construir el organigrama con Highcharts
        this.buildChart(result.data);
      });
  }

  buildChart(data: any) {
    // Lógica para construir el organigrama con Highcharts
    // Puedes consultar la documentación de Highcharts para organigramas
    // https://www.highcharts.com/docs/chart-and-series-types/organization-chart
  }
}

