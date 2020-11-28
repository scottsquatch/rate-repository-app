import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';

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
      <FormikTextInput name="username" placeholder="Username" style={styles.field}/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry style={styles.field} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.submit}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      const authStorage = new AuthStorage();
      await authStorage.setAccessToken(data.authorize.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

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

export default SignIn;