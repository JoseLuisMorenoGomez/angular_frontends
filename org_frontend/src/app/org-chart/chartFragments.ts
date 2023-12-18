// chartFragments.ts

import gql from 'graphql-tag';

export const OrgDepartmentFragment = gql`
  fragment OrgDepartmentFragment on OrgDepartmentType {
    id
    name
    parent {
      id
    }
    managerPosition {
      name
      orgpersonnelSet {
        name
        imageUrl
      }
    }
  }
`;


