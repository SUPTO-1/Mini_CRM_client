import { Outlet } from "react-router-dom";
import ProfilePanel from "../../Component/ProfilePanel";


const Dashboard = () => {
    return (
        <>
            <div className="grid grid-cols-10 gap-4">
                <div className="col-span-2">
                    <ProfilePanel />
                </div>
                <div className="col-span-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;