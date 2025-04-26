import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import Dashboard from "../Page/Dashboard";
import Login from "../Page/Authentication/Login";
import Register from "../Page/Authentication/Register";
import AddClient from "../Page/Client/AddClient";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element:<Login></Login>
            },
            {
                path : '/register',
                element: <Register></Register>
            },
            {
                path:"/addClient",
                element:<AddClient></AddClient>
            }
        ],
    },
    {
        path: "/dashboard",
        element : <Dashboard/>,
        // children: [
        //     {
        //         path: '/dashboard',
        //         element: ,
        //     },
        // ],
    }
]);

export default router;