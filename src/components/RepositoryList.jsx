import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import theme from '../theme';

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

export const RepositoryListContainer = ({ repositories, onValueChange, value }) => {
  const history = useHistory();
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => (
        <View style={styles.heading}>
          <ListOrderDropdown onValueChange={onValueChange} value={value} />
        </View>)}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => history.push(`/repository/${item.id}`)}
        >
          <RepositoryItem 
            item={item} 
          />
         </TouchableOpacity>)}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const { repositories } = useRepositories(orderBy, orderDirection);
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

  return <RepositoryListContainer 
    repositories={repositories} 
    onValueChange={onValueChange}
    value={order}
  />;
};

export default RepositoryList;