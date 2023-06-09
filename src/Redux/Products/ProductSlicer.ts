import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Store'
import Product from '../../Models/Product'

interface ProductState {
    list: Product[];
}

const initialState: ProductState = {  
    list: []
};

export const productSlice = createSlice({
  name: 'products',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.list = action.payload
    },
  },
})

export const { setProducts } = productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProducts = (state: RootState) => state.products.list

export default productSlice.reducer