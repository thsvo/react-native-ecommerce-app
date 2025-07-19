import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './components/screens/HomeScreen';
import CategoriesScreen from './components/screens/CategoriesScreen';
import PhoneScreen from './components/screens/PhoneScreen';
import Profile from './components/screens/Profile';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import './global.css';
import RegistrationScreen from './components/screens/RegistrationScreen';
import LoginScreen from './components/screens/LoginScreen';
import AuthContext, { AuthProvider } from './context/AuthContext';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'help';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'All Product') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Phone') {
            iconName = focused ? 'call' : 'call-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Register') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="All Product" component={HomeScreen} />
      <Tab.Screen name="Phone" component={PhoneScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      {token ? (
        <Tab.Screen
          name="Logout"
          component={() => null}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity style={props.style} onPress={logout}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Ionicons name="log-out-outline" size={24} color="gray" />
                  <Text style={{ color: 'gray' }}>Logout</Text>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
      ) : (
        <>
          <Tab.Screen name="Register" component={RegistrationScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Header />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}
