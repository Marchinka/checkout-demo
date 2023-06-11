import { useAppDispatch as useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { toggleModal, upsertProduct } from "../../Redux/ProductSlicer";
import { useEffect, useState } from "react";
import { AppModal } from "../AppModal/AppModal";

const CLASSES = {
    input: "appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
}

export const ProductEditModal = () => {    
    const dispatch = useAppDispatch();
    const showModal = useAppSelector(state => state.products.showEditModal);
    const productInEdit = useAppSelector(state => state.products.productInEdit);

    const toggle = (value: boolean) => dispatch(toggleModal(value));

    const [productId, setProductId] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");

    useEffect(() => {
        setProductId(productInEdit?.id || "");
        setPrice(productInEdit?.price || 0);
        setImg(productInEdit?.img || "");
    }, [productInEdit]);

    const saveProduct = () => {
        if (!productId || !price || !img) return;
        dispatch(upsertProduct({ productId: productInEdit?.id as string, product: { id: productId, price, img }}))
        toggle(false);
    };

    return (<AppModal   isOpen={showModal} toggleModal={toggle} 
                        content={<form className="w-full max-w-lg">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className={CLASSES.label}>
                                            Product Id
                                            </label>
                                            <input className={CLASSES.input} id="grid-first-name" type="text"
                                                    value={productId} onChange={e => setProductId(e.target.value)}/>
                                            {productId != null || <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className={CLASSES.label}>
                                            Price
                                            </label>
                                            <input className={CLASSES.input} id="grid-last-name" type="number"
                                                    value={price} onChange={e => setPrice(Number(e.target.value))}/>
                                            {price > 0 || <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                        <div className="w-full px-3 mt-4">
                                            <label className={CLASSES.label}>
                                            URL
                                            </label>
                                            <input className={CLASSES.input} id="grid-last-name" type="text"
                                                    value={img} onChange={e => setImg(e.target.value)} />
                                            {img != null || <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                    </div>
                                </form>} 
                        footer={<>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        onClick={() => saveProduct()}
                                        >
                                        Save
                                        </button>
                                        <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => toggle(false)}
                                        >
                                        Cancel
                                        </button>
                                </>} 
                        />)
}