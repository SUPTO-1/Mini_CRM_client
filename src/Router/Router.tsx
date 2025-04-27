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
import ViewClients from "../Page/Client/ViewClients";
import UpdateClient from "../Page/Client/UpdateClient";
import AddProject from "../Page/Project/AddProject";
import ViewProjects from "../Page/Project/ViewProject";
import UpdateProject from "../Page/Project/UpdateProject";
import AddMeeting from "../Page/Interaction/AddMeeting";
import ViewLogs from "../Page/Interaction/ViewLogs";
import AddReminder from "../Page/Reminders/AddReminder";
import WeeklyReminders from "../Page/Reminders/WeeklyReminders";


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
            {
                path:"viewClients",
                element:<ViewClients></ViewClients>
            },
            {
                path:"updateClient/:id",
                element:<UpdateClient></UpdateClient>
            },
            {
                path:"addProject/:clientId",
                element:<AddProject></AddProject>
            },
            {
                path:"viewProjects",
                element:<ViewProjects></ViewProjects>
            },
            {
                path: "updateProject/:id",
                element: <UpdateProject></UpdateProject>
            },
            {
                path: "addMeeting/client/:clientId",
                element: <AddMeeting />
            },
            {
                path: "addMeeting/project/:projectId",
                element: <AddMeeting />
            },
            {
                path:"viewLogs",
                element:<ViewLogs></ViewLogs>
            },
            {
                path:'addReminder',
                element:<AddReminder></AddReminder>
            },
            {
                path: "viewReminders",
                element: <WeeklyReminders></WeeklyReminders>
            }
        ],
    }
]);

export default router;