import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductSlicer';
import rulesReducer from './RulesSlicer';
import checkoutReducer from './CheckoutSlicer';

export const store = configureStore({
  reducer: {
    products: productReducer,
    rules: rulesReducer,
    checkout: checkoutReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch