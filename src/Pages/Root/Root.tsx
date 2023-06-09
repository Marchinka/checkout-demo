import { Link, Outlet, RouterProvider } from "react-router-dom";
import { AppRoutes, AppRouter } from "../Router";

export const Root = () => {
    return (<div><header>
            <Link to={AppRoutes.home}>Checkout</Link>
            <Link to={AppRoutes.products}>Products</Link>
            <Link to={AppRoutes.rules}>Rules</Link>
            </header>
            <main>
                <Outlet />
            </main>
    </div>)
};