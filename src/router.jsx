import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Products from "./views/Products";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import ProductMaterials from "./views/ProductMaterials";
import BillOfQuantity from "./views/BillOfQuantity";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path:'/',
                element: <Navigate to= "/products"/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/products',
                element: <Products/>
            },
            {
                path: '/product-materials',
                element: <ProductMaterials/>
            },
            {
                path: '/bill-of-quantity',
                element: <BillOfQuantity/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
])

export default router;