import 'react-native-gesture-handler';
import React from 'react';
import {LogBox, TouchableOpacity, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import YourContacts from './screens/YourContacts';
import User from './screens/User';
import Icon from 'react-native-vector-icons/Ionicons';
import AddContacts from './screens/AddContacts';
import Profile from './screens/Profile';
import FavoriteContacts from './screens/FavoriteContacts';

const Screens = createStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const renderHeaderRight = () => {
  const navigation = useNavigation();
  // Render the button for the header right
  return (
    <TouchableOpacity onPress={() => navigation.navigate('FavoriteContacts')}>
      <View style={{marginRight: 12, flexDirection:'row'}}>
        <Text
          style={{color: 'black', paddingTop: 2}}>
          Favorites  
        </Text>
        <Icon name="star" size={20} color="gold" />
      </View>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Screens.Navigator initialRouteName="YourContacts">
        <Screens.Screen
          name="AddContacts"
          component={AddContacts}
          options={{title: 'Add Contacts'}}
        />
        <Screens.Screen
          name="YourContacts"
          component={YourContacts}
          options={{title: 'Your Contacts', headerRight: renderHeaderRight}}
        />
        <Screens.Screen
          name="User"
          component={User}
          options={{title: 'Edit Contact'}}
        />
        <Screens.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Screens.Screen
          name="FavoriteContacts"
          component={FavoriteContacts}
          options={{title: 'Favorite Contacts'}}
        />
      </Screens.Navigator>
    </NavigationContainer>
  );
}
