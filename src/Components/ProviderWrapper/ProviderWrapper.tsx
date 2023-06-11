import { Provider } from "react-redux"
import { store } from "../../Redux/Store"
import { useEffect } from "react"
import { AppRepository } from "../../Domain/AppRepository";
import { useappDispatch } from "../../Redux/Hooks";
import { Bootstrapper } from "../Bootstrapper/Bootstrapper";

export const ProviderWrapper = (props: { children: React.ReactNode }) => {    
    return (
        <Provider store={store}>
            <Bootstrapper>
                {props.children}
            </Bootstrapper>
        </Provider>
    )
}