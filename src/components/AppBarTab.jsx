import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Text from './Text'

const AppBarTab = ({ text }) => {
  return (
    <View>
      <TouchableWithoutFeedback>
        <View>
          <Text color="textAppBar">{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppBarTab;