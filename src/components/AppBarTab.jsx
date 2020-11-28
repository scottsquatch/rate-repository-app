import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text'

const styles = {
  container: {
    paddingRight: 10,
  }
}
const AppBarTab = ({ text, linkTo, onPress }) => {
  return (
    <View style={styles.container}>
      <Link 
        to={linkTo}
        component={TouchableWithoutFeedback}
        onPress={onPress}
      >
        <View>
          <Text color="textAppBar">{text}</Text>
        </View>
      </Link>
    </View>
  );
};

export default AppBarTab;