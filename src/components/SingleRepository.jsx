import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  },
  reviewRatingContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    padding: 10,
  },
  reviewRating: {
    color: theme.colors.primary,
    textAlign: 'center',
  },
  textContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    padding: 10,
    paddingTop: 0,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem 
        item={repository}
        singleMode
      />
      <ItemSeparator />
    </View>
  );
};



const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const first = 2;
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = 
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      }
    });
  };

  const onEndReach = () => {
    console.log('end reached for reviews');
    handleFetchMore();
  };

  if (loading) {
    return <View><Text>loading...</Text></View>;
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
