import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.field} testID="usernameField" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry style={styles.field} testID="passwordField" />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton" >
        <Text style={styles.submit}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) =>  <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;