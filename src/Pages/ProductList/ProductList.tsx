import { PageTemplate } from "../../Components/PageTemplate/PageTemplate";
import { ProductEditModal } from "../../Components/ProductEditModal/ProductEditModal";
import { ProductTableList } from "../../Components/ProductTableList/ProductTableList";
import { IProduct } from "../../Models/Product";
import { useAppSelector } from "../../Redux/Hooks";
import { useAppDispatch as useAppDispatch } from "../../Redux/Hooks";
import { editProduct, toggleModal } from "../../Redux/ProductSlicer";

export const ProductList = () => {
    const dispatch = useAppDispatch();
    const catalogue = useAppSelector(state => state.products.catalogue);
    const items = Object.keys(catalogue).map((productId) => catalogue[productId]);

    const newProduct = () => {
        dispatch(editProduct({} as IProduct));
        dispatch(toggleModal(true));
    };

    return <PageTemplate title={"Product List"}>
                <ProductTableList items={items} />
                <ProductEditModal />
                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={() => newProduct()}
                        >
                            New Product
                    </button>
                </div>
            </PageTemplate>
}; 