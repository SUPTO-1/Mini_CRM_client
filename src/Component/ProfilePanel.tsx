import { NavLink } from 'react-router-dom';
import Profile from "../../Images/11.jpg";
import { useAuth } from '../Page/Authentication/AutheContext';
import { useState } from 'react';

const ProfilePanel = () => {

    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const Route = <>
        <li className='mb-2'><NavLink to='/dashboard' className={({ isActive }) => isActive ? "text-[#FF6F91]" : "text-[#0c0c0c]"}>Dashboard</NavLink></li>
        <li className='mb-2'><NavLink to='addClient' className={({ isActive }) => isActive ? "text-[#B948FF]" : "text-[#0c0c0c]"}>Add Client</NavLink></li>
        <li className='mb-2'><NavLink to='addReminder' className={({ isActive }) => isActive ? "text-[#B948FF]" : "text-[#0c0c0c]"}>Set Reminder</NavLink></li>
    </>
    return (
        <>
            <div className='hidden lg:block'>
                <div className="h-screen bg-[#bec4fa] py-8 grid grid-rows-9">

                    {/* Personal Information */}
                    <div className="lg:p-3 row-span-4">
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
                        <button onClick={logout} className='text-[#ffffff] w-full py-2 text-xl hover:scale-[1.01]' style={{ background: 'linear-gradient(90deg, #C65CFF, #B948FF, #953DF5, #7231EC)', }}>Log Out</button>
                    </div>
                </div>
            </div>
            <div className='block lg:hidden w-full'>
                <div className='flex justify-between items-center p-3 md:px-6 md:py-3 bg-[#bec4fa] w-full'>

                    <div className='flex items-center gap-1 mg:gap-3'>
                        <div className="relative lg:hidden">
                            {/* Button */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {open && (
                                <ul className="absolute mt-2 w-48 bg-white rounded-md shadow-lg p-2 z-50">
                                    {Route}
                                </ul>
                            )}
                        </div>
                        {/* Personal Information */}
                        <div className="flex items-center gap-1 md:gap-3">
                            <img src={Profile} alt="My personal image" className='rounded-full w-12 h-12 md:w-14 mx-auto md:h-14' />
                            <div>
                                <h1 className='text-lg md:text-xl font-semibold'>{user?.name}</h1>
                                <p className='text-xs md:text-sm'>{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Log Out Button */}
                    <div className="">
                        <button onClick={logout} className='text-[#ffffff] rounded p-2 md:px-4 md:py-2 text-sm md:text-lg hover:scale-[1.01]' style={{ background: 'linear-gradient(90deg, #C65CFF, #B948FF, #953DF5, #7231EC)', }}>Log Out</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePanel;