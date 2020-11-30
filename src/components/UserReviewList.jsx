import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import Text from './Text';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const UserReviewList = () => {
  const { data, loading } = useQuery(GET_AUTHORIZED_USER, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'cache-and-network',
  });
  
  if (loading) {
    return <View><Text>loading...</Text></View>;
  }

  const reviews = data.authorizedUser.reviews.edges.map(edge => edge.node);

  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  ); 
};

export default UserReviewList;