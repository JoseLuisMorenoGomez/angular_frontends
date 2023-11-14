export type Department = {
    id: number;
    name: string;
    subdepartment: Department[]
    }
  };
  
export type Query = {
    Departments: Department[];
  };