import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { StackNavigator } from './component/StackNavigator';
import Splash from './screens/Splash';

export default function App() {
  return (
      <AppContainer />
  );
}

const SwitchNavigator = createSwitchNavigator({
  Splash: { screen:Splash },
  Stack: { screen:StackNavigator }
});

const AppContainer = createAppContainer(SwitchNavigator)