import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './Store'
import { IRuleSet } from '../Models/Rules';

interface CheckoutState {
  list: string[];
}

const initialState: CheckoutState = {  
    list: []
};

export const checkoutSlicer = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckout: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload
    },
  },
})

export const { setCheckout } = checkoutSlicer.actions

export const selectCheckout = (state: RootState) => state.checkout.list;

export default checkoutSlicer.reducer