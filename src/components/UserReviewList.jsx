import React from 'react';
import { View, FlatList, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-native';

import Text from './Text';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import ReviewItem from './ReviewItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    padding: 5,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  viewRepository: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 10,
  },
  deleteReview: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListItem = ({ item, refetch }) => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    await mutate({
      variables: {
        id,
      }
    });

    await refetch();
  };

  const onDeletePressed = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: () => deleteReview(item.id),
        },
      ]
    );
  };

  return (
    <View>
      <ReviewItem review={item} />
      <View style={styles.buttonContainer}>
        <Link 
          to={`/repository/${item.repositoryId}`}
          component={TouchableWithoutFeedback}
        >
          <Text style={styles.viewRepository} fontWeight="bold">View repository</Text>
        </Link>
        <TouchableWithoutFeedback onPress={onDeletePressed}> 
          <Text style={styles.deleteReview} fontWeight="bold">Delete review</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>);
};

const UserReviewList = () => {
  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
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
      renderItem={({ item }) => <ListItem item={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  ); 
};

export default UserReviewList;