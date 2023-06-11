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
    addProduct: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const index = state.list.indexOf(action.payload);
      if (index > -1) {
        state.list.splice(index, 1);
      }
    }
  },
})

export const { setCheckout, addProduct, removeProduct } = checkoutSlicer.actions

export const selectCheckout = (state: RootState) => state.checkout.list;

export default checkoutSlicer.reducer