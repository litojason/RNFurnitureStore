import React, {useEffect} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainBottomTab from './MainBottomTab';
import InitialStack from './InitialStack';
import {lightTheme} from '../utils';
import MainStack from './MainStack';
import {getToken} from '../lib/asyncStorage';
import {RootState} from '../store/store';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {fetchProfile, userActions} from '../store/reducers/userReducer';

const RootNavigator = () => {
  // const scheme = useColorScheme();
  // const {token, setToken, theme, setTheme} = useAppContext();

  // const selectedTheme =
  // theme === 'system'
  //   ? scheme === 'dark'
  //     ? darkTheme
  //     : lightTheme
  //   : theme === 'dark'
  //   ? darkTheme
  //   : lightTheme;

  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getToken().then(token => {
      // console.log('token', token);
      dispatch(userActions.setToken(token));
      dispatch(fetchProfile());
    });
  }, []);

  return (
    <NavigationContainer theme={lightTheme}>
      {!user.token ? <InitialStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
