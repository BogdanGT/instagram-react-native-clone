import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from  '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'


import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Home from './src/screens/Home'
import AddPost from './src/screens/AddPost'
import Profile from './src/screens/Profile'
import ViewPost from './src/screens/ViewPost'
import Search from './src/screens/Search'
import WhoLikes from './src/screens/whoLikes'
import YourFollowed from './src/screens/YourFollowed'
import AddComment from './src/screens/addComment'
import UserProfile from './src/screens/UserProfile'
import YourFollowers from './src/screens/YourFollowers'
import Chat from "./src/screens/Chat"
import Conversation from './src/screens/Conversation';

import {Provider} from './src/context/createDataContext'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor:"#f78138",
        inactiveTintColor:"grey",
        showLabel:false,
        activeBackgroundColor:"white",
        inactiveBackgroundColor:"white",
        style:{
          borderTopWidth:0
        }
      }}
    >
      <Tab.Screen options={{tabBarIcon:() => <Icon name="home" size={25}></Icon>}} name="Home" component={Home} />
      <Tab.Screen options={{tabBarIcon:() => <Icon name="search1" size={25}></Icon>}} name="Search" component={Search} />
      <Tab.Screen options={{tabBarIcon:() => <Icon2 name="person-outline" size={25}></Icon2>}} name="Profile" component={Profile} />
      <Tab.Screen options={{tabBarIcon:() => <Icon2 name="chatbubble-ellipses-outline" size={25}></Icon2>}} name="Chat" component={Chat} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="ViewPost" component={ViewPost} />
        <Stack.Screen name="WhoLikes" component={WhoLikes} />
        <Stack.Screen name="YourFollowed" component={YourFollowed} />
        <Stack.Screen name="AddComment" component={AddComment} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="YourFollowers" component={YourFollowers} />
        <Stack.Screen name="Conversation" component={Conversation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default () => {
  return <Provider>
    <App />
  </Provider>
};
