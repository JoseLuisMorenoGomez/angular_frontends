export type Department = {
    id: number;
    name: string;
    parent: {
      id: number;
      name: string;
    }
  };
  
export type Query = {
    Departments: Department[];
  };