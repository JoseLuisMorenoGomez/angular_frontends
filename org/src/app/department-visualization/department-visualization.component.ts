import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';
import * as d3 from 'd3';

// Interfaz para definir la estructura de datos
interface DepartmentNode {
  id: number;
  name: string;
  subdepartments: DepartmentNode[];
}


@Component({
  selector: 'app-department-visualization',
  templateUrl: './department-visualization.component.html',
  styleUrls: ['./department-visualization.component.css'],
})
export class DepartmentVisualizationComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            departmentsAll {
              id
              name
              subdepartments {
                id
                name
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((response: any) => {
  const data = response.data;
  const treeData = data.departments;

        // Configura un lienzo SVG
        const svg = d3.select('app-department-visualization').append('svg').attr('width', 800).attr('height', 400);

        // Configura un grupo para la visualización
        const g = svg.append('g').attr('transform', 'translate(50, 50)');

        // Define una jerarquía en D3
        const hierarchy = d3.hierarchy(treeData);

        // Configura un layout de árbol
        const treeLayout = d3.tree().size([300, 300]);

        // Calcula los nodos y enlaces del árbol
        const treeDataProcessed = treeLayout(hierarchy);

        // Función para manejar clic en los nodos
        function clickHandler(event: any, d: any) {
          if (d.subdepartments) {
            d._subdepartments = d.subdepartments;
            d.subdepartments = null; // Colapsar subdepartments al hacer clic
          } else {
            d.subdepartments = d._subdepartments;
            d._subdepartments = null; // Expandir subdepartments al hacer clic
          }
          update(d);
        }

        // Función para actualizar la visualización
        function update(source: DepartmentNode) {
          // Actualiza los nodos
          const nodes = g
            .selectAll('.node')
            .data(treeLayout(root).descendants(), d => d.data.id)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`);

          nodes.append('circle').attr('r', 5).on('click', clickHandler);

          nodes
            .append('text')
            .attr('dy', -10)
            .style('text-anchor', 'middle')
            .text(d => d.data.name);

          // Actualiza los enlaces
          const links = g
            .selectAll('.link')
            .data(treeLayout(root).links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`);
        }

        // Inicialmente, crea los nodos de primer nivel
        const root = treeDataProcessed;
        update(root);
      });
  }
}
