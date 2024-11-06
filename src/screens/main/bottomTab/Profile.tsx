import React from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ProfileNavProp} from '../../../types/navigation.types';
import {
  Button,
  Header,
  Icon,
  ProfileMenuCard,
  Screen,
  Text,
} from '../../../components';
import {ProfileMenuProps} from '../../../components/card/ProfileMenuCard';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {userActions} from '../../../store/reducers/userReducer';

const PROFILE_MENUS: ProfileMenuProps['data'][] = [
  {
    name: 'Payment methods',
    iconName: 'credit-card-outline',
    navigateTo: 'PaymentMethods',
  },
  {
    name: 'Saved addresses',
    iconName: 'map-marker-outline',
    navigateTo: 'SavedAddresses',
  },
  {
    name: 'Change password',
    iconName: 'lock-outline',
    navigateTo: 'ChangePassword',
  },
  {name: 'Change theme', iconName: 'brightness-6', navigateTo: 'ChangeTheme'},
];

const ProfileScreen = ({navigation}: ProfileNavProp) => {
  const {colors} = useTheme();

  const {email, name} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const renderLogoutButton = () => {
    return (
      <Pressable
        onPress={() => dispatch(userActions.logout())}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.8 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          },
        ]}>
        <Icon name="logout" color={colors.error} />
        <Text style={{color: colors.error}}>Logout</Text>
      </Pressable>
    );
  };

  return (
    <Screen isBottomTabScreen>
      <Header title="Profile" />

      <View style={{flex: 1, padding: 16, paddingTop: 0, gap: 16}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            gap: 8,
            backgroundColor: colors.surface,
            borderRadius: 8,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'grey',
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text weight="semibold">{name}</Text>
              <Text variant="label">{email}</Text>
            </View>

            <Icon
              name="square-edit-outline"
              onPress={() => navigation.navigate('EditProfile')}
            />
          </View>
        </View>

        <View style={{flex: 1, gap: 4}}>
          <Text variant="h3">Menus</Text>

          <View style={{gap: 16}}>
            {PROFILE_MENUS.map(menu => (
              <ProfileMenuCard
                key={menu.name}
                data={menu}
                navigation={navigation}
              />
            ))}
          </View>
        </View>

        {renderLogoutButton()}
      </View>
    </Screen>
  );
};

export default ProfileScreen;
