import React, {useState, useEffect} from 'react'
import Logo from '../assets/img/homepage/logo.png'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux'
import { logout } from '../store/reducer/user'


function Header() {
    const {isAuth, data} = useSelector((s) => s.user)
    const role = data.role
    // const isAuth = false
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)
    const handleClick = event =>{
        setIsActive(current => !current)
        console.log(isActive)
    }

    useEffect(() =>{
    }, [isActive])


    return (
        <header>
        <nav className="bg-white tracking-wider ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 lg:px-8 relative z-50 bg-white ">
            <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 justify-between space-x-20 items-center sm:justify-start sm:items-stretch ">
                <div className="flex flex-shrink-0 items-center ">
                    <img
                    className="block h-8 w-auto lg:hidden"
                    src={Logo}
                    alt="Your Company"
                    />
                    <img
                    className="hidden h-8 w-auto lg:block"
                    src={Logo}
                    alt="Your Company"
                    />
                </div>
                <div className="inset-y-0 left-0 flex items-center sm:hidden" >
                    <button

                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white hover:outline-none hover:ring-2 hover:ring-inset hover:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                    onClick={handleClick}


                    >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="block h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    <svg
                        className="hidden h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    </button>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-10  pt-2">
                    <Link
                        to="/"
                        className=" text-gray-500 hover:text-gray-700 text-center justify-center text-sm font-medium"
                    >
                        Home
                    </Link>
                    {
                        data.role == 'admin' ?
                        <>
                        <Link
                            to="/admin"
                            className=" text-gray-500 hover:text-gray-700 text-center justify-center text-sm font-medium"
                        >
                            Manage Movie
                        </Link>
                        <Link
                            to="/list/"
                            className=" text-gray-500 hover:text-gray-700 text-center justify-center text-sm font-medium"
                        >
                            Manage Schedule
                        </Link>
                        </>
                        :
                        <Link
                        to="/list/"
                        className=" text-gray-500 hover:text-gray-700 text-center justify-center text-sm font-medium"
                        >
                            List Movie
                        </Link>

                    }


                   
                    </div>
                </div>
                </div>
                <div className="hidden sm:flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block relative ml-3">
                    {
                        isAuth ? 
                        <div>
                        <form
                            type="button"
                            className="flex rounded-full bg-gray-800 text-sm hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-primary hover:opacity-80 active:opacity-50"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true"
                            onClick={() => navigate('/profil')}
                        >
                            <img
                            className=" h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            />
                            <input
                            className="absolute w-8 h-8 rounded-full"
                            type="submit"
                            value=""
                            />
                        </form>
                        </div>
                        :
                        <div>
                            <button className='btn btn-primary' onClick={() =>  navigate('/login')}>Sign in</button>
                        </div>
                    }

                </div>
                </div>
            </div>
            </div>
            
            <div className="sm:hidden">
            <div style={{display: isActive ? 'block' :'none'}}  className="hidden absolute bg-white w-full" id="mobile-menu">
             
                <div className="relative w-full bg-white z-50 ">
                <form className="flex justify-center">
                    <div className="relative w-full mx-5">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full my-10 p-3 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        required=""
                    />
                    </div>
                </form>
                <Link
                    to="/"
                    className="border-y border-gray-300 text-gray-500 hover:text-gray-700 py-4 text-center font-medium block text-lg"
                >
                    Home{" "}
                </Link>
                {
                    role === 'admin' ? 
                    <div>
                    <Link
                        to="/admin/"
                        className="border-b border-gray-300 text-gray-500 hover:text-gray-700 py-4 text-center font-medium block text-lg"
                    >
                        Manage Movie
                    </Link>
                    <Link
                        to="/list/"
                        className="border-b border-gray-300 text-gray-500 hover:text-gray-700 py-4 text-center font-medium block text-lg"
                    >
                        Manage Schedule
                    </Link>
                    </div>
                    :
                    <Link
                    to="/list/"
                    className="border-b border-gray-300 text-gray-500 hover:text-gray-700 py-4 text-center font-medium block text-lg">
                    List Movie
                    </Link>
                }
                <Link
                    to="/profil/"
                    className="border-b border-gray-300 text-gray-500 hover:text-gray-700 py-4 text-center font-medium block text-lg">
                    Profile
                </Link>
                <Link
                    to="/login"
                    onClick={() => dispatch(logout())}
                    className="border-b border-gray-300 text-gray-500 hover:text-gray-700 py-4 text-center font-medium block text-lg"
                >
                    Log Out
                </Link>
                <p className=" text-gray-500 text-md text-center items-center  pt-6 pb-2 block space-x tracking-wide">
                    © 2020 Tickitz. All Rights Reserved.
                </p>
                </div>
                <div
                className="fixed inset-0 z-0 bg-black opacity-20"
                id="mobile-menu"
                />
            </div>
            </div>
        </nav>
        </header>

  )
}

export default Header