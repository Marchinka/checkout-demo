import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Store'
import { Catalogue } from '../../Models/Product';

interface ProductState {
  catalogue: Catalogue;
}

const initialState: ProductState = {  
    catalogue: {
      "A": { id: 'A', price: 100 },
      "B": { id: 'B', price: 100 },
      "C": { id: 'C', price: 100 },
    }
};

export const productSlice = createSlice({
  name: 'products',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Catalogue>) => {
      state.catalogue = action.payload
    },
  },
})

export const { setProducts } = productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCatalogue = (state: RootState) => state.products.catalogue

export default productSlice.reducer