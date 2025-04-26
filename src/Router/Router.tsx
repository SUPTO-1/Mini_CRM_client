import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import Dashboard from "../Page/Dashboard";
import Login from "../Page/Authentication/Login";
import Register from "../Page/Authentication/Register";


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