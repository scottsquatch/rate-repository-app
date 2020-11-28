import { gql } from 'apollo-boost';
import { REPOSITORY_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
${REPOSITORY_INFO}

query {
  repositories {
    edges {
      node {
        ...RepositoryInfo
      }
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;

export const GET_REPOSITORY = gql`
${REPOSITORY_INFO}

query GetRepository($id: ID!) {
  repository(id: $id) {
    ...RepositoryInfo
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;