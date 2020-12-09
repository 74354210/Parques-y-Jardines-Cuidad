import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"

import ParkScreen from "./screens/ParkScreen"
import ParkDetailScreen from "./screens/ParkDetailScreen"
import ParkMap from "./screens/ParkMap"

//Navegacion entre las Screen de Logueo - Register
const OnBoardingNavigator= createStackNavigator({
  //OnBoard: OnBoardingScreen,
  //OnBoard2: OnBoardingScreen2,
  //OnBoard3: OnBoardingScreen3,
  Login: LoginScreen,
  Register: RegisterScreen,
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
})

//Navegacion entre las Screen vista dentro de la Applicacion (Parques)
const RootStack= createStackNavigator({
  Parques: ParkScreen,
  Detalle: ParkDetailScreen,
  Mapa: ParkMap
},{
  initialRouteName: 'Parques',
})

//Navegacion entre Logueo <-> dentro del Aplicacion
const BaseStack = createSwitchNavigator({
  OnBoarding: OnBoardingNavigator,
  Root: RootStack,
}, {
  initialRouteName: 'OnBoarding',
})

export default createAppContainer(BaseStack)

