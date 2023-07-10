import React, {useEffect, useState} from 'react'
import HeaderSign from '../../component/headerSign'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import useApi from '../../helper/useApi'
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [email_user, setEmail] = useState()
    const [password_user, setPassword] = useState()
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [info, setInfo] = useState()
    const api = useApi()
    const {isAuth} = useSelector((s) => s.user)
    const navigate = useNavigate()

    const createNewAccount = async (e) =>{
        try {
            e.preventDefault()
            const data = await api({
                method: 'POST',
                url: '/user/',
                data: {email_user, password_user, first_name, last_name}
            })
            
            setInfo('Activated your account from email')
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect((e)=>{
        if(isAuth){
            navigate('/')
        }
    },[isAuth])
    


    
    return (
        <>
            <div className="flex flex-col lg:flex-row " id="container">
                <HeaderSign />
                <div className="mt-10 mx-5 lg:w-[40%] lg:m-auto">
                <h1 className="text-3xl tracking-tight font-semibold mb-3 lg:text-5xl lg:font-bold ">
                    Sign Up
                </h1>
                <p className="text-gray-500 w-full max-w-sm tracking-wider">
                    Fill your additional details
                </p>
                <form className="mt-4 w-[100%] max-w-md" method='POST' onSubmit={createNewAccount}>
                    <div>
                    <label className="block mt-4 mb-2">First Name</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="Write your first name"
                    />
                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Last Name</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Write your last name"
                    />
                    </div>
                    <div>
                    <label className="block mb-2 mt-4">Email</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="email"
                        name="email"
                        value={email_user}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Write your email"
                    />
                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Password</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="password"
                        id="email"
                        name="email"
                        value={password_user}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Write your password"
                    />
                    </div>
                    <div className="">
                    <input
                        className="h-14 mt-8 bg-primary text-white tracking-wider w-full rounded-xl cursor-pointer"
                        type="submit"
                        // onclick="location.href='index.html';"

                    />
                    <p className="text-center text-gray-500 font-semibold mt-8">
                        Already have an account?{" "}
                        <Link
                        to="/login"
                        className="text-primary border-b border-primary"
                        style={{ textDecoration: "none" }}
                        >
                        Sign In
                        </Link>{" "}
                    </p>
                    <p className="text-center text-red-900 mt-5 font-semibold">{info}</p>

                    </div>
                </form>
                </div>

            </div>


        </>

    )
}

export default Signup