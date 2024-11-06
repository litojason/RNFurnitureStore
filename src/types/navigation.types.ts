import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type InitialStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};
export type LandingNavProp = NativeStackScreenProps<
  InitialStackParamList,
  'Landing'
>;
export type LoginNavProp = NativeStackScreenProps<
  InitialStackParamList,
  'Login'
>;
export type RegisterNavProp = NativeStackScreenProps<
  InitialStackParamList,
  'Register'
>;

export type MainBottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Favorites: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type HomeNavProp = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<MainBottomTabParamList, 'Home'>
>;
export type CategoryNavProp = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<MainBottomTabParamList, 'Categories'>
>;
export type FavoritesNavProp = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<MainBottomTabParamList, 'Favorites'>
>;
export type OrdersNavProp = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<MainBottomTabParamList, 'Orders'>
>;
export type ProfileNavProp = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<MainBottomTabParamList, 'Profile'>
>;

export type SavedAddressesParams = {
  screenBefore: 'profile' | 'cart';
};
export type PaymentMethodsParams = {
  screenBefore: 'profile' | 'cart';
};
export type MainStackParamList = {
  MainBottomTab: NavigatorScreenParams<MainBottomTabParamList>;
  CategoryItems: {categoryId: number; name: string};
  FurnitureDetails: {furnitureId: number};
  FurnitureOption: undefined;
  Cart: undefined;
  CheckOut: undefined;

  Notifications: undefined;
  Search: undefined;

  EditProfile: undefined;

  OrderDetails: {orderId: number};

  PaymentMethods?: PaymentMethodsParams;
  CardPayment: {cardId?: number};

  // SavedAddresses: undefined;
  SavedAddresses?: SavedAddressesParams;
  EditAddress: {addressId?: number};

  ChangePassword: undefined;
  ChangeTheme: undefined;
};
export type CategoryItemsNavProp = NativeStackScreenProps<
  MainStackParamList,
  'CategoryItems'
>;
export type FurnitureDetailsNavProp = NativeStackScreenProps<
  MainStackParamList,
  'FurnitureDetails'
>;
export type FurnitureOptionNavProp = NativeStackScreenProps<
  MainStackParamList,
  'FurnitureOption'
>;
export type CartNavProp = NativeStackScreenProps<MainStackParamList, 'Cart'>;
export type CheckOutNavProp = NativeStackScreenProps<
  MainStackParamList,
  'CheckOut'
>;
export type NotificationsNavProp = NativeStackScreenProps<
  MainStackParamList,
  'Notifications'
>;
export type SearchNavProp = NativeStackScreenProps<
  MainStackParamList,
  'Search'
>;

export type EditProfileNavProp = NativeStackScreenProps<
  MainStackParamList,
  'EditProfile'
>;
export type OrderDetailsNavProp = NativeStackScreenProps<
  MainStackParamList,
  'OrderDetails'
>;
export type PaymentMethodsNavProp = NativeStackScreenProps<
  MainStackParamList,
  'PaymentMethods'
>;
export type CardPaymentNavProp = NativeStackScreenProps<
  MainStackParamList,
  'CardPayment'
>;
export type SavedAddressesNavProp = NativeStackScreenProps<
  MainStackParamList,
  'SavedAddresses'
>;
export type EditAddressNavProp = NativeStackScreenProps<
  MainStackParamList,
  'EditAddress'
>;
export type ChangePasswordNavProp = NativeStackScreenProps<
  MainStackParamList,
  'ChangePassword'
>;
export type ChangeThemeNavProp = NativeStackScreenProps<
  MainStackParamList,
  'ChangeTheme'
>;
