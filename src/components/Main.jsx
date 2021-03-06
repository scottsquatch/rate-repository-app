import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import NewReview from './NewReview';
import SignUp from './SignUp';
import UserReviewList from './UserReviewList'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/repository/:id">
          <SingleRepository />
        </Route>
        <Route path="/newreview" exact>
          <NewReview />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/myreviews" exact>
          <UserReviewList />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;