import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient} from '@apollo/react-hooks';

import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBar,
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" linkTo="/" />
        {data && data.authorizedUser 
          ? <AppBarTab text="Sign Out" onPress={logout} />
          : <AppBarTab text="Sign In" linkTo="/signin" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;