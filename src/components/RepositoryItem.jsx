import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    padding: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
  },
  topContainer: {
    flexDirection: 'row',
    padding: 5,
    flex: 1,
  },
  infoContainer: {
    paddingLeft: 20,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    flex: 1,
  },
  infoItem: {
    paddingBottom: 5,
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
  },
  statContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  statText: {
    alignSelf: 'center',
  }
});

const RepositoryItem = ({ item }) => {
  return (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <Image 
        style={styles.avatar}
        source={{ uri: item.ownerAvatarUrl }}
        testID="avatarIcon"
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text fontWeight="bold" testID="nameField">{item.fullName}</Text>
        </View>
        <View sylte={styles.infoItem}>
          <Text color="textSecondary" testID="descriptionField">{item.description}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.language} testID="languageField">{item.language}</Text>
        </View>
      </View>
    </View>
    <View style={styles.statContainer}>
      <View>
        <Text fontWeight="bold" style={styles.statText} testID="starsField">{item.stargazersCount > 1000 ? (item.stargazersCount / 1000).toFixed(1) + 'k' : item.stargazersCount}</Text>
        <Text color="textSecondary" style={styles.statText}>Stars</Text>
      </View>
      <View>
        <Text fontWeight="bold" style={styles.statText} testID="forksField">{item.forksCount > 1000 ? (item.forksCount / 1000).toFixed(1) + 'k' : item.forksCount}</Text>
        <Text color="textSecondary" style={styles.statText}>Forks</Text>
      </View>
      <View>
        <Text fontWeight="bold" style={styles.statText} testID="reviewsField">{item.reviewCount}</Text>
        <Text color="textSecondary" style={styles.statText}>Reviews</Text>
      </View>
      <View>
        <Text fontWeight="bold" style={styles.statText} testID="ratingField">{item.ratingAverage}</Text>
        <Text color="textSecondary" style={styles.statText}>Rating</Text>
      </View>
    </View>
  </View>);
};

export default RepositoryItem;