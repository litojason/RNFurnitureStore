import {configureStore} from '@reduxjs/toolkit';

import addressReducer from './reducers/addressReducer';
import cartReducer from './reducers/cartReducer';
import categoryReducer from './reducers/categoryReducer';
import furnitureReducer from './reducers/furnitureReducer';
import favoriteReducer from './reducers/favoriteReducer';
import orderReducer from './reducers/orderReducer';
import paymentMethodReducer from './reducers/paymentMethodReducer';
import searchReducer from './reducers/searchReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    address: addressReducer,
    cart: cartReducer,
    category: categoryReducer,
    favorite: favoriteReducer,
    furniture: furnitureReducer,
    order: orderReducer,
    paymentMethod: paymentMethodReducer,
    search: searchReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
