import React, {Component} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import SubmitRegister from '../database/Register';
import {AuthInput, AuthSwitch} from '../custom/Variables';
import {authenticationStyles, globalStyles} from '../style/Styles';

//client side validation via yup
const registerSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required('Username required'),
  email: yup
    .string()
    .label('Email')
    .email('Please provide a valid email')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required('Password must be 8 - 20 characters')
    .min(8)
    .max(20),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      value => value === true,
    ),
  notifications: yup.boolean().label('Notifications'),
});


// register form view
export default class Register extends Component {

  render(){
    return (
      <ScrollView>
        <TouchableWithoutFeedback
          touchSoundDisabled={true}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={authenticationStyles.authContainer}>
            <View>
              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  agreeToTerms: false,
                  notifications: false,
                }}
                onSubmit={(values, actions) => {
                  console.log(values);
                  Keyboard.dismiss();
                  setTimeout(() => {
                    actions.setSubmitting(false);
                  }, 1000);
                  SubmitRegister(values, this.props.navigation);
                }}
                validationSchema={registerSchema}>
                {formikProps => (
                  <React.Fragment>
                    <View>
                      <AuthInput
                        label="Username:"
                        formikProps={formikProps}
                        formikKey="username"
                        placeholder="Please enter a username"
                      />
                      <AuthInput
                        label="Email:"
                        formikProps={formikProps}
                        formikKey="email"
                        placeholder="Please enter your email"
                      />
                      <AuthInput
                        label="Password:"
                        formikProps={formikProps}
                        formikKey="password"
                        placeholder="Please enter a password"
                        secureTextEntry
                      />
                      <AuthInput
                        label="Confirm Password:"
                        formikProps={formikProps}
                        formikKey="confirmPassword"
                        placeholder="Please confirm password"
                        secureTextEntry
                      />

                      <TouchableOpacity onPress={() => this.props.navigation.navigate('TCScreen')}>
                        <Text style={authenticationStyles.tcText}>View Terms and Conditions</Text>
                      </TouchableOpacity>
                      
                      <AuthSwitch
                        label="Agree to Terms:"
                        formikKey="agreeToTerms"
                        formikProps={formikProps}
                      />
                      <AuthSwitch
                        label="Opt in to new post notifications?"
                        formikKey="notifications"
                        formikProps={formikProps}
                      />
                      {formikProps.isSubmitting ? (
                        <ActivityIndicator size="large" color="white" />
                      ) : (
                        <View>
                          <TouchableOpacity
                            style={authenticationStyles.newUserButton}
                            onPress={formikProps.handleSubmit}>
                            <Text style={authenticationStyles.authText}>
                              Register your account!
                            </Text>
                          </TouchableOpacity>
                          <Text style={authenticationStyles.authError}>
                            {formikProps.errors.general}
                          </Text>
                        </View>
                      )}
                    </View>
                  </React.Fragment>
                )}
              </Formik>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
