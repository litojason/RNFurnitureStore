import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';

import {MainBottomTabParamList} from '../types/navigation.types';
import {Icon} from '../components';
import HomeScreen from '../screens/main/bottomTab/Home';
import CategoriesScreen from '../screens/main/bottomTab/Categories';
import FavoritesScreen from '../screens/main/bottomTab/Favorites';
import OrdersScreen from '../screens/main/bottomTab/Orders';
import ProfileScreen from '../screens/main/bottomTab/Profile';

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const MainBottomTab = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          let selectedColor = focused ? colors.primary : colors.placeholder;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'shape' : 'shape-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'clipboard-text' : 'clipboard-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={selectedColor} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTab;
