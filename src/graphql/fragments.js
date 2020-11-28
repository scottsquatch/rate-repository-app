import { gql } from 'apollo-boost';

export const REPOSITORY_INFO = gql`
fragment RepositoryInfo on Repository {
  id
  ownerAvatarUrl
  fullName
  description
  language
  stargazersCount
  forksCount
  reviewCount
  ratingAverage
}
`;