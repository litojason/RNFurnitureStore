import React, {useEffect} from 'react';
import {View} from 'react-native';

import {HomeNavProp} from '../../../types/navigation.types';
import {
  CategoryList,
  HomeHeader,
  PopularList,
  Screen,
  SearchInput,
} from '../../../components';
import {useAppDispatch} from '../../../hooks/storeHooks';
import {fetchCategories} from '../../../store/reducers/categoryReducer';
import {fetchCartItems} from '../../../store/reducers/cartReducer';

const HomeScreen = ({navigation}: HomeNavProp) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCartItems());
  }, []);

  return (
    <Screen isSafeArea>
      <HomeHeader navigation={navigation} />

      <View style={{padding: 16, paddingTop: 0, gap: 16}}>
        <SearchInput navigateToSearchScreen navigation={navigation} />

        <CategoryList navigation={navigation} />
        {/* <PopularList navigation={navigation} /> */}
      </View>
    </Screen>
  );
};

export default HomeScreen;
