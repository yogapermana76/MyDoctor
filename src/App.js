import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Router';
import FlashMessage from "react-native-flash-message";
import { Provider, useSelector } from 'react-redux'
import store from './redux/store';
import { Loading } from './components';
import { YellowBox } from 'react-native';

const MainApp = () => {
  const state = useSelector(state => state)
  YellowBox.ignoreWarnings(['Setting a timer', 'Using an unspecified index'])
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {state.loading && <Loading />}
    </>
  )
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
};

export default App;
