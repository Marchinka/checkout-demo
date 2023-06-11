import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './Store'
import { ICatalogue } from '../Models/Product';

interface CatalogueState {
  catalogue: ICatalogue;
}

const initialState: CatalogueState = {  
    catalogue: {}
};

export const catalogeSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    setCatalogue: (state, action: PayloadAction<ICatalogue>) => {
      state.catalogue = action.payload
    },
  },
})

export const { setCatalogue } = catalogeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCatalogue = (state: RootState) => state.products.catalogue

export default catalogeSlice.reducer