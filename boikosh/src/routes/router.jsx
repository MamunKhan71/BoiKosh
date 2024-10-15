import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/homepage/Homepage";
import MyWishList from "../pages/wishlistpage/MyWishList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/wishlist',
                element: <MyWishList />
            }
        ]
    },
]);