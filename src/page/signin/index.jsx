import React, {useEffect, useState} from "react";
import HeaderSign from "../../component/headerSign"
import {Link, useNavigate} from 'react-router-dom'


import useApi from "../../helper/useApi";
import { login, addData } from "../../store/reducer/user"
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useParams } from 'react-router-dom'

function Signin(){
    const [username, setUsername] = useState()
    const [password_user, setPassword] = useState()
    const [status, setStatus] = useState(0)
    const api = useApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useSelector((s) => s.user)
    const params = useParams()

    const goLogin = async (e) =>{
        try {
            e.preventDefault()
            console.log(username, password_user)
            const {data} = await api({
                method: 'POST',
                data: {username, password_user},
                url:'/auth/'
            })
            console.log(data)


            if(data.status == 200){
                const token = data.token
                const decode = jwtDecode(token)
                console.log(decode)
                dispatch(login(token))
                dispatch(addData({role: decode.role}))
                navigate('/')
                setStatus(data.status)
            }else{
                setStatus(404)
            }


        } catch (error) {
        }
    }

    
    const verifyAccount = async (e) =>{
        try {
            const {data} = await api (`/auth/${params.verify}`)
            setStatus(data.status)
        } catch (error) {
        }
    }

    useEffect((e) =>{
        if(isAuth){
            navigate('/')
        }

        if(params.verify !== undefined){
            verifyAccount()
        }

        if(status === 404){
            navigate('/login')

        }
    },[isAuth, status])


    return(
        <>
            <div className="flex flex-col lg:flex-row " id="container">

                <HeaderSign />
                {
                    status === 201 ? 
                    <dialog id="my_modal_1" className="modal modal-open">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Status</h3>
                        <p className="py-4">Verify account success</p>
                        <div className="modal-action">
                        <button className="btn modal-close" onClick={(e) => {setStatus(0); navigate('/login');}} >Close</button>
                        </div>
                    </form>
                    </dialog> :
                    ''
                }

                <div className="mt-10 mx-5 lg:w-[40%] lg:m-auto">
                    <h1 className="text-3xl tracking-tight font-semibold mb-3 lg:text-5xl ">
                    Sign In
                    </h1>
                    <p className="text-gray-500 w-full max-w-sm tracking-wider">
                    Sign in with your data that you entered during your registration
                    </p>
                    <form className="mt-4 w-[100%] max-w-md" method="post" onSubmit={goLogin}>
                    <p>
                        <label className="block mb-2">Email</label>
                        <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="email"
                        name="email"
                        value={username}
                        placeholder="Write your email"
                        onChange={e => setUsername(e.target.value)}
                        />
                    </p>
                    <p>
                        <label className="block mt-4 mb-2">Password</label>
                        <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Write your password"
                        value={password_user}
                        onChange = {e => setPassword(e.target.value)}
                        />
                    </p>
                    <p className="">
                        <input
                        className="h-14 mt-8 bg-primary text-white tracking-wider w-full rounded-xl cursor-pointer"
                        type="submit"
                        value="Login"
                        // onclick={navigate('/')}

                        />
                        <p className="mt-5 mb-3 text-center text-gray-500 font-semibold">
                        Forgot your password?{" "}
                        <a className="text-primary border-b border-primary">Reset now</a>{" "}
                        </p>
                        <p className="text-center text-gray-500 font-semibold">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-primary border-b border-primary"
                            style={{ textDecoration: "none" }}
                        >
                            Sign Up
                        </Link>{" "}
                        </p>
                        {
                            status === 400 ? <p className="text-center text-red-900 mt-5 font-semibold">Invalid Username or Passowrd</p> 
                            : ''

                        }
                    </p>
                    </form>
                    

                </div>
            </div>
        </>

    )
}

export default Signin