import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';

 const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser  = async ({ username, password }) => {
    const res = await mutate({
      variables: {
        username,
        password
      }
    });

    return res;
  };

  return [createUser, result];
};

export default useCreateUser;