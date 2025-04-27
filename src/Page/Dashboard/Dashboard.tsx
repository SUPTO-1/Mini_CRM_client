import { Outlet } from "react-router-dom";
import ProfilePanel from "../../Component/ProfilePanel";


const Dashboard = () => {
    return (
        <>
            <div className="lg:grid lg:grid-cols-10">
                <div className="lg:col-span-2">
                    <ProfilePanel />
                </div>
                <div className="lg:col-span-8 bg-[#f2edf3] lg:h-0">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;