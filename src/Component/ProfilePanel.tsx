import { NavLink } from 'react-router-dom';
import Profile from "../../Images/11.jpg";
import { useAuth } from '../Page/Authentication/AutheContext';

const ProfilePanel = () => {

    const {user , logout} = useAuth();
    const Route = <>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='addClient'>Add Client</NavLink></li>
        <li><NavLink to=''>Add meetings</NavLink></li>
        <li><NavLink to='addReminder'>Set Reminder</NavLink></li>
    </>
    return (
        <>
            <div className="h-screen bg-green-300 py-8 grid grid-rows-8">

                {/* Personal Information */}
                <div className="lg:p-3 row-span-3">
                    <img src={Profile} alt="My personal image" className='rounded-full w-48 mx-auto h-48' />
                    <h1 className='my-2 text-3xl text-center font-semibold'>{user?.name}</h1>
                    <p className='text-center'>{user?.email}</p>
                    <p className='text-center'>{user?.phone}</p>
                    <hr className='my-3' />
                </div>

                {/* Some Routing List */}
                <div className="list-none ml-8 mt-7 text-lg row-span-4">
                    {Route}
                </div>

                {/* Log Out Button */}
                <div className="m-6 row-span-1">
                    <button onClick={logout} className='bg-blue-400 w-full py-2 rounded-lg text-lg'>Log Out</button>
                </div>
            </div>
        </>
    );
};

export default ProfilePanel;