import { gql } from 'apollo-boost';

export const AUTHORIZE_USER = gql`
mutation AuthorizeUser($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`;

export const CREATE_REVIEW = gql`
mutation CreateReview(
  $repoName: String!
  $repoOwnerName: String!
  $rating: Int!
  $review: String
) {
  createReview(
    review:{
    	repositoryName: $repoName
    	ownerName: $repoOwnerName
    	rating: $rating
    	text: $review
    }
  )
  {
    repositoryId
  }
}
`;