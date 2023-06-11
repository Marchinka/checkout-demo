import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './Store'
import { ICatalogue, IProduct } from '../Models/Product';

interface CatalogueState {
  catalogue: ICatalogue;
  showEditModal: boolean;
  productInEdit: IProduct | null;
}

const initialState: CatalogueState = {  
    catalogue: {}, productInEdit: null, showEditModal: false
};

export const catalogeSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    setCatalogue: (state, action: PayloadAction<ICatalogue>) => {
      state.catalogue = action.payload
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      delete state.catalogue[action.payload];
    },
    upsertProduct: (state, action: PayloadAction<IProduct>) => {
      state.catalogue[action.payload.id] = action.payload;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.showEditModal = action.payload;
    }
  },
})

export const { setCatalogue, deleteProduct, upsertProduct, toggleModal } = catalogeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCatalogue = (state: RootState) => state.products.catalogue

export default catalogeSlice.reducer