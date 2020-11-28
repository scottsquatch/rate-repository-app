import React from 'react';
import { View } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      id
    }
  });

  if (loading) {
    return <View><Text>loading...</Text></View>;
  }

  const repository = data.repository;
  return (
    <View>
      <RepositoryItem 
        item={repository}
        singleMode
      />
    </View>
  );
};

export default SingleRepository;
