import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
  repoOwnerName: yup
    .string()
    .required('Repository owner name is required'),
  repoName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Must be between 0 and 100')
    .max(100, 'Must be between 0 and 100'),
   review: yup
    .string(),
});

const initialValues = {
  repoOwnerName: '',
  repoName: '',
  rating: '',
  review: '',
};


const NewReviewForm = ({ onSubmit }) => {
  return <View style={styles.container}>
    <FormikTextInput
      name="repoOwnerName"
      placeholder="Repository owner name"
      style={styles.field}
    />
    <FormikTextInput
      name="repoName"
      placeholder="Repository name"
      style={styles.field}
    />
    <FormikTextInput
      name="rating"
      placeholder="Rating between 0 and 100"
      style={styles.field}
    />
    <FormikTextInput
      name="review"
      placeholder="Review"
      style={styles.field}
      multiline
    />
    <TouchableWithoutFeedback onPress={onSubmit}>
      <Text style={styles.submit}>Create a review</Text>
    </TouchableWithoutFeedback>
  </View>;
};

const NewReview = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const {
      repoOwnerName,
      repoName,
      review,
      rating
    } = values;

    try {
      const { data: { createReview: { repositoryId }}} = await createReview({ repoOwnerName, repoName, review, rating: parseInt(rating)});

      history.push(`/repository/${repositoryId}`);
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
        {({ handleSubmit }) =>  <NewReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default NewReview;
