import { Component,  ElementRef, OnInit, AfterViewInit ,ViewChild} from '@angular/core';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import { OrgChartService } from './org-chart.service';

interface OrgDepartment {
  id: number;
  name: string;
}

interface OrgChartData {
  allOrgDepartments: {
    orgdepartmentSet: OrgDepartment[];
  }[];
}

interface HierarchyNode {
  id?: number;
  name: string;
  children?: HierarchyNode[];
}

@Component({
  selector: 'org-chart',
  template: '<div class=chart-container>  </div>',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit, AfterViewInit  {
  @ViewChild('chartcontainer') chartContainer: ElementRef;

  constructor(private orgChartService: OrgChartService) {}

  ngOnInit(): void {

  
  }

  ngAfterViewInit(): void {
    this.orgChartService.getOrgChart().subscribe((allOrgDepartments) => {
      new OrgChart().container('.chart-container').data(allOrgDepartments).render();
    });
  }

  private getFlattenedData(data: OrgChartData): HierarchyNode {
    const allOrgDepartments = data.allOrgDepartments;

    const hierarchyData: HierarchyNode = {
      name: 'Root',
      children: allOrgDepartments.map((department) => ({
        name: department.orgdepartmentSet[0].name,
        children: department.orgdepartmentSet.slice(1).map((subDepartment) => ({
          name: subDepartment.name
        }))
      }))
    };

    const descendants = d3.hierarchy(hierarchyData).descendants();

    descendants.forEach((d, i) => {
      // Assign to data property, not id directly
      d.data.id = d.data.id ? d.data.id : i; // Use i as a fallback if id is not present
    });

    return {
      name: hierarchyData.name,
      children: descendants
        .filter(node => node.children)
        .map(node => ({ id: node.data.id, name: node.data.name }))
    };
  }
}