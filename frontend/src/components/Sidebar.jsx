import React from 'react'
import { navLinks } from './../constants/navLinks';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { user, logout } = useAuth();
  return (
    <nav className='flex flex-col gap-32 border-r border-r-gray-200 p-2 md:p-8 fixed w-[70px] md:w-[250px] top-0 bottom-0 left-0 bg-white'>
        <h1 className='md:block hidden text-xl font-light'>
            Beginner's Luck
        </h1>
        <ul className='flex flex-col md:mt-0 mt-32'>
            {
                navLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                        <li key={index}>
                            <Link to={link.path} className={`flex items-center transition duration-200 ease-in-out gap-3 text-md px-4 rounded-xl py-2 ${pathname.startsWith(link.path) ? 'text-white bg-green-600' : ''}`}>
                                <Icon size={25} />
                                <span className='md:block hidden'>
                                    {link.name}
                                </span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
        {
            user && (
                <button className='button-sm md:button-lg' onClick={logout}>
                    Logout
                </button>
            )
        }
    </nav>
  )
}

export default Sidebar