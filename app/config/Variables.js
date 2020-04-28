import React from 'react';
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {globalStyles} from './Styles';

//reads today's date in default Javascript
export const date = new Date();
//current user ID
export const userKey = Firebase.auth().currentUser.uid;
//reference of current user posts
export const userPostRef = Firebase.database().ref('user_posts/' + userKey);

//constant component for posts
export const Post = ({
  createdAt,
  createdBy,
  description,
  heading,
  location,
  onPress,
  uri,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={globalStyles.postContainer}>
      <Image style={globalStyles.image} source={uri} />
      <Text style={globalStyles.postText}>
        {heading} @ {location}
        {'\n'}
        posted by {createdBy}
        {'\n'}
        {description}
        {'\n'}
        {createdAt}
      </Text>
    </View>
  </TouchableOpacity>
);

//variables for custom text input and switches
//works with formik and yup for user authentication
const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    <Text style={globalStyles.formLabel}>{label}</Text>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);
export const CustomTextInput = ({label, formikProps, formikKey, ...rest}) => {
  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.inputBox}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};
export const CustomSwitch = ({formikKey, formikProps, label, ...rest}) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);