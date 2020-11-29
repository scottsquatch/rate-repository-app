import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
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
  passwordConf: '',
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(1, 'Username must be between 1 and 30 characters')
      .max(30, 'Username must be between 1 and 30 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password must be between 5 and 50 characters')
      .max(50, 'Password must be between 5 and 50 characters'),
    passwordConf: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password confirmation must match password')
      .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.field}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.field}
      />
      <FormikTextInput
        name="passwordConf"
        placeholder="Password confirmation"
        secureTextEntry
        style={styles.field}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.submit}>Sign up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signUp] = useCreateUser();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
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
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;