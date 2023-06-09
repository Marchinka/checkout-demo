import { Provider } from "react-redux"
import { store } from "../../Redux/Store"

export const ProviderWrapper = (props: { children: React.ReactNode }) => {    
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}