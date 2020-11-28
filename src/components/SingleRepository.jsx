import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';

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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRatingContainer}>
        <Text style={styles.reviewRating} fontWeight="bold">{review.rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text color="textSecondary">{format(new Date(review.createdAt), "MM.dd.yyyy")}</Text>
        <ItemSeparator />
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

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
  const reviews = repository.reviews.edges.map(edge => edge.node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
