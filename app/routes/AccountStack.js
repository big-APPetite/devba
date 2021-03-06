import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomHeader from '../custom/CustomHeader';
import AccountScreen from '../screens/AccountScreen';
import ViewPostsScreen from '../screens/ViewPostsScreen';
import EditPostScreen from '../screens/EditPostScreen';
import ChangeUsernameScreen from '../screens/ChangeUsernameScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import ChangeNotificationsScreen from '../screens/ChangeNotificationsScreen';

//plugs into RootStack
//directs to AccountScreen

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={() => ({
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#28A966'},
      })}>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={({navigation}) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Account" />
          ),
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="ViewPosts"
        component={ViewPostsScreen}
        options={{title: 'Your Posts', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="EditForm"
        component={EditPostScreen}
        options={{title: 'Edit Post', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ChangeUsername"
        component={ChangeUsernameScreen}
        options={{title: 'Change Username', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{title: 'Change Password', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{title: 'Delete Account', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ChangeNotifications"
        component={ChangeNotificationsScreen}
        options={{
          title: 'Change Notification Settings',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
