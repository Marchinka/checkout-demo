import { useAppDispatch as useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { useEffect, useState } from "react";
import { AppModal } from "../AppModal/AppModal";
import { toggleModal, upsertRule } from "../../Redux/RulesSlicer";
import { Numerify } from "../../Domain/Numerify";

const CLASSES = {
    input: "appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
}

export const RuleEditModal = () => {    
    const dispatch = useAppDispatch();
    const showModal = useAppSelector(state => state.rules.showEditModal);
    const ruleInEdit = useAppSelector(state => state.rules.ruleInEdit);
    const catalogue = useAppSelector(state => state.products.catalogue);
    const productIdList = Object.keys(catalogue);
    const toggle = (value: boolean) => dispatch(toggleModal(value));

    const [productId, setProductId] = useState("");
    const [specialPrice, setSpecialPrice] = useState<number | undefined>(0);
    const [quantity, setQuantity] = useState<number | undefined>(0);

    useEffect(() => {
        setProductId(ruleInEdit?.productId || "");
        setSpecialPrice(ruleInEdit?.payload?.specialPrice || 0);
        setQuantity(ruleInEdit?.payload?.quantity || 0);
    }, [ruleInEdit]);

    const saveRule = () => {
        if (!productId || !quantity || !specialPrice) return;

        dispatch(upsertRule({ productId: ruleInEdit?.productId as string, rule: { 
            productId: productId, 
            type: "multiprice",
            payload: { specialPrice: specialPrice, quantity: quantity } 
        }}))
        toggle(false);
    };

    return (<AppModal   isOpen={showModal} toggleModal={toggle} 
                        content={<form className="w-full max-w-lg">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className={CLASSES.label}>
                                            Product Id
                                            </label>
                                            <select id="countries" className={CLASSES.input} 
                                                    value={productId} onChange={e => setProductId(e.target.value)}>
                                                <option value="" disabled>Choose a product</option>
                                                {productIdList.map((productId) => <option key={productId} value={productId}>{productId}</option>)}
                                            </select>
                                            {productId != null || productId != "" || <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className={CLASSES.label}>
                                            Quantity
                                            </label>
                                            <input className={CLASSES.input} id="grid-last-name" type="number"
                                                    value={quantity} onChange={e => setQuantity(Numerify(e.target.value))}/>
                                            {(quantity && quantity > 0) || <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className={CLASSES.label}>
                                            Special Price
                                            </label>
                                            <input className={CLASSES.input} id="grid-last-name" type="number"
                                                    value={specialPrice} onChange={e => setSpecialPrice(Numerify(e.target.value))}/>
                                            {(specialPrice && specialPrice > 0) || <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                    </div>
                                </form>} 
                        footer={<>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        onClick={() => saveRule()}
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