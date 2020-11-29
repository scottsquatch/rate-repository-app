import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/mutations';

 const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview  = async ({ repoOwnerName, repoName, rating, review }) => {
    const res = await mutate({
      variables: {
        repoOwnerName,
        repoName,
        rating,
        review
      }
    });

    return res;
  };

  return [createReview, result];
};

export default useCreateReview;