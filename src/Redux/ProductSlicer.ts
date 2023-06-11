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
    upsertProduct: (state, action: PayloadAction<{ productId: string, product: IProduct}>) => {
      if (action.payload.productId != action.payload.product.id) {
        delete state.catalogue[action.payload.productId];
      }
      state.catalogue[action.payload.product.id] = action.payload.product;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.showEditModal = action.payload;
    },
    editProduct: (state, action: PayloadAction<IProduct>) => {
      state.productInEdit = action.payload;
    }
  },
})

export const { setCatalogue, deleteProduct, upsertProduct, toggleModal, editProduct } = catalogeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCatalogue = (state: RootState) => state.products.catalogue

export default catalogeSlice.reducer