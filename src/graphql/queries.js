import { gql } from 'apollo-boost';
import { REPOSITORY_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
${REPOSITORY_INFO}

query GetRepositories(
  $orderBy: AllRepositoriesOrderBy 
	$orderDirection: OrderDirection
  $searchKeyword: String
  $after: String
  $first: Int
) {
  repositories(
    orderBy: $orderBy
    orderDirection:$orderDirection
    searchKeyword: $searchKeyword
    after: $after
    first: $first
  ) {
    edges {
      node {
        ...RepositoryInfo
        url
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query GetAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
${REPOSITORY_INFO}

query GetRepository(
  $id: ID!
  $first: Int
  $after: String
) {
  repository(id: $id) {
    ...RepositoryInfo
    url
    ownerName
    reviews (
      first: $first
      after: $after
    ) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;