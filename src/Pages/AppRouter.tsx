import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";
import { Checkout } from "./Checkout/Checkout";
import { ProductList } from "./ProductList/ProductList";
import { RuleList } from "./RuleList/RuleList";
import { Root } from "./Root/Root";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: AppRoutes.home,
                element: <Checkout />
              },
              {
                path: AppRoutes.products,
                element: <ProductList />
              },
              {
                path: AppRoutes.rules,
                element: <RuleList />
              }
        ],
      },
]);
