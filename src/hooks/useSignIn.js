import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { AUTHORIZE_USER } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

 const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE_USER);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const res = await mutate({
      variables: {
        username,
        password
      }
    });

    await authStorage.setAccessToken(res.data.authorize.accessToken);
    apolloClient.resetStore();

    return res;
  };

  return [signIn, result];
};

export default useSignIn;