import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  heading: {
    padding: 10,
    backgroundColor: "#e1e4e8",
  },
  dropdown: {
    backgroundColor: "#e1e4e8",
    color: "#e1e4e8",
    font: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    borderRadius: 0,
  },
  search: {
    backgroundColor: 'white',
    marginBottom: 10,
    font: theme.fonts.main,
    fontSize: theme.fontSizes.body,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListOrderDropdown = ({ onValueChange, value }) => {
  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      placeholder={{ label: 'Select an item...', value: '', color: '#9EA0A4'}}
      value={value}
      style={StyleSheet.flatten(styles.dropdown)}
      items={[
        { label: 'Latest repositories', value: 'latest' },
        { label: 'Highest rated repositories', value: 'highest_rated' },
        { label: 'Lowest rated repositories', value: 'lowest_rated' },
      ]}
    />
  );
};

export const RepositoryListHeader = ({ onValueChange, value, onTextChange, text }) => {
  return (
    <View style={styles.heading}>
      <TextInput style={styles.search} value={text} onChangeText={onTextChange} />
      <ListOrderDropdown onValueChange={onValueChange} value={value} />
    </View>
  );
}
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      onValueChange,
      value,
      text,
      onTextChange,
    } = this.props;

    return (
      <RepositoryListHeader
        onValueChange={onValueChange}
        value={value}
        text={text}
        onTextChange={onTextChange}
      />
    );
  };

  render() {
    const { repositories, onItemPress } = this.props;
    const repositoryNodes = repositories 
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onItemPress(item.id)}
          >
            <RepositoryItem 
              item={item} 
            />
          </TouchableOpacity>)}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [text, setText] = useState('');
  const [searchKeyword] = useDebounce(text, 500);
  const history = useHistory();

  const { repositories } = useRepositories(orderBy, orderDirection, searchKeyword);

  const onValueChange = (value) => {
    setOrder(value);

    switch (value) {
      case '': 
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest_rated':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest_rated':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
    }
  };

  const onTextChange = (value) => {
    setText(value);
  };

  const onItemPress = (id) => history.push(`/repository/${id}`);

  return <RepositoryListContainer 
    repositories={repositories} 
    onValueChange={onValueChange}
    value={order}
    text={text}
    onTextChange={onTextChange}
    onItemPress={onItemPress}
  />;
};

export default RepositoryList;