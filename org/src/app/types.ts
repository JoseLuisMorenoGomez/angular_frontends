export type DepartmentType = {
    id: number;
    name: string;
    
  };
  
export type Query = {
    Departments: DepartmentType[];
  };