import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
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

const ItemSeparator = () => <View style={styles.separator} />;

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

export default ReviewItem;