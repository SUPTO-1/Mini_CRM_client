import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import Login from "../Page/Authentication/Login";
import Register from "../Page/Authentication/Register";
import Dashboard from "../Page/Dashboard/Dashboard";
import AddClient from "../Page/Client/AddClient";
import DataOverview from "../Component/DataOverview";
import PrivateRoute from "../Page/Authentication/PrivateRoute";


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
        element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                index:true,
                element:<DataOverview></DataOverview>

            },
            {
                path:"addClient",
                element:<AddClient></AddClient>
            },
        ],
    }
]);

export default router;