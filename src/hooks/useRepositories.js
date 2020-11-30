import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const [repositories, setRepositories] = useState();
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    }
  });

  const fetchRepositories = () => {
    if (data) {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;