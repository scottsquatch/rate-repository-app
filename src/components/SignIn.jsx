import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik'

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  submit: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    textAlign: 'center',
    padding: 5,
    margin: 5,
  },
  field: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.field}/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry style={styles.field} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.submit}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  }

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) =>  <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;