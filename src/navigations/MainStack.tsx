import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainStackParamList} from '../types/navigation.types';
import MainBottomTab from './MainBottomTab';
import CategoryItemsScreen from '../screens/main/CategoryItems';
import FurnitureDetailsScreen from '../screens/main/FurnitureDetails';
import FurnitureOptionScreen from '../screens/main/FurnitureOption';
import CartScreen from '../screens/main/Cart';
import CheckOutScreen from '../screens/main/CheckOut';

import NotificationsScreen from '../screens/main/Notifications';
import SearchScreen from '../screens/main/Search';

import OrderDetailsScreen from '../screens/main/OrderDetails';

import EditProfileScreen from '../screens/main/profile/EditProfile';

import PaymentMethodsScreen from '../screens/main/profile/PaymentMethods';
import CardPaymentScreen from '../screens/main/profile/CardPayment';

import SavedAddressesScreen from '../screens/main/profile/SavedAddresses';
import EditAddressScreen from '../screens/main/profile/EditAddress';

import ChangePasswordScreen from '../screens/main/profile/ChangePassword';
import ChangeThemeScreen from '../screens/main/profile/ChangeTheme';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainBottomTab" component={MainBottomTab} />
      <Stack.Screen name="CategoryItems" component={CategoryItemsScreen} />
      <Stack.Screen
        name="FurnitureDetails"
        component={FurnitureDetailsScreen}
      />
      <Stack.Screen
        name="FurnitureOption"
        component={FurnitureOptionScreen}
        options={{presentation: 'transparentModal'}}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="CheckOut" component={CheckOutScreen} />

      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />

      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />

      <Stack.Screen name="EditProfile" component={EditProfileScreen} />

      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="CardPayment" component={CardPaymentScreen} />

      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen name="EditAddress" component={EditAddressScreen} />

      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ChangeTheme" component={ChangeThemeScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
