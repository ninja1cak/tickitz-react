import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../component/header'
import Footer from '../../component/footer'
import { logout } from '../../store/reducer/user'
import { useDispatch } from "react-redux";
import useApi, {useApiMulti} from '../../helper/useApi'
import { useSelector } from 'react-redux'

function Profil() {
    
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [password_user, setPassword] = useState('')
    const [confirPassword, setConfirmPassword] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [email_user, setEmail] = useState('')
    
    const [user, setUser] = useState([])
    const [status,setStatus] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = useApi()
    const apiMulti = useApiMulti()
    const {isAuth} = useSelector((s) => s.user)

    const getUserData = async () =>{
        
        try {
            // const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/user/`)    
            const {data} = await api({
                url: '/user'
            })
            setUser(data.data[0])
            
        } catch (error) {
            console.log(error)
        }
    }

    const updateUserData = async (e) =>{
        
        try {
            
            e.preventDefault()
            window.my_modal_2.showModal()
            const formData = new FormData()
            console.log(first_name)
            formData.append('first_name', first_name)
            formData.append('last_name', last_name)
            formData.append('phone_number', `+62${phone_number}`)
            formData.append('email_user', email_user)
            // const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/user`, formData)
            const {data} = await apiMulti({
                url:'/user',
                method: 'PUT',
                data: formData
            })
            setStatus(data.status)
            console.log(data)

        } catch (error) {
            setStatus(404)
        }
    }

    const updatePassword = async (e) =>{
        try {
            e.preventDefault()
            window.my_modal_1.showModal()

            if(password_user === confirPassword){
                console.log(password_user)
                const formData = new FormData()
                formData.append('password_user', password_user)
                const {data} = await apiMulti({
                    url:'/user',
                    method: 'PUT',
                    data: formData
                })
                console.log(data.status)
                setStatus(200)
            }else{
                setStatus(400)

                console.log("INPUT BERBEDA")
            }
        } catch (error) {
        }
    }

    const goLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    useEffect(() =>{
        if(!isAuth){
            navigate('/')
        }
        getUserData()
    }, [])

    return (
    <>
    <Header />
    <main className='bg-gray-100 pt-5'>
        <div className="lg:flex lg:mx-auto lg:mt-10 lg:w-[100%] lg:max-w-7xl lg:px-6">
            <section>
            <div className="block mb-10  bg-white lg:hidden">
                <div className="flex justify-around pt-3 tracking-wider mx-auto max-w-lg">
                <a
                    href="./profilpage.html"
                    className="border-b-4 border-primary pb-6 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                >
                    Details Account
                </a>
                <a
                    href="./orderhistory.html"
                    className="text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                >
                    Order History
                </a>
                </div>
            </div>
            </section>
            <section className="hidden w-[100%] max-w-[320px] lg:block mr-10 ">
            <div className="block bg-white p-10 rounded-t-lg ">
                <p>INFO</p>
                <div className="flex flex-col items-center mt-6 tracking-wider">
                <img
                    className="mx-auto rounded-full h-36"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
                <p className="font-medium text-lg mt-4 mb-2">{user.first_name + ' ' + user.last_name }</p>
                <p className="text-sm text-gray-600 ">Moviegoers</p>
                </div>
            </div>
            <div className="block border-t border-gray-300 bg-white py-6 rounded-b-lg">
                <button onClick={goLogout} className="block bg-primary h-11 w-40 text-white tracking-wider text-sm mx-auto rounded-lg hover:opacity-50 active:opacity-100 active:bg-white active:text-primary border active:border-primary">
                Logout
                </button>
            </div>
            </section>
            <div className="lg:w-[100%]">
            <section>
                <div className="hidden mb-10  bg-white lg:block pt-1 rounded-lg ">
                <div className="flex justify-start pt-3 tracking-wider max-w-lg">
                    <a
                    href="./profilpage.html"
                    className="border-b-4 border-primary pb-6 lg:mx-6 lg:mr-10 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                    >
                    Account Settings
                    </a>
                    <a
                    href="./orderhistory.html"
                    className="text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                    >
                    Order History
                    </a>
                </div>
                </div>
            </section>
            <section className="block mx-auto max-w-2xl lg:hidden">
                <div className="block bg-white mx-3 p-6 rounded-t-lg ">
                <p>INFO</p>
                <div className="flex flex-col items-center mt-6 tracking-wider">
                    <img
                    className="mx-auto rounded-full h-36"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <p className="font-medium text-lg mt-4 mb-2">{`${user.first_name} ${user.last_name}`}</p>
                    <p className="text-sm text-gray-600 ">Moviegoers</p>
                </div>
                </div>
                <div className="block border-t mx-3 border-gray-300 bg-white py-6 rounded-b-lg">
                <button className="block bg-primary h-11 w-40 text-white tracking-wider text-sm mx-auto rounded-lg">
                    Logout
                </button>
                </div>
            </section>
            <section className="block mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="mx-3 mt-8 lg:mx-0">
                <p className="text-lg font-medium text-gray-800 mb-8 lg:hidden">
                    Account Settings
                </p>
                <div className="bg-white p-6 rounded-lg">
                    <p className="border-b mb-10 border-gray-300 pb-2 text-lg">
                    Details Information
                    </p>
                    <form className="tracking-wider lg:flex lg:flex-wrap lg:gap-x-10 " method='POST' encType="multipart/form-data" onSubmit={updateUserData}>
                    <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        {/* <label className="block mb-3 lg:hidden">Full Name</label> */}
                        <label className="block mb-3 lg:block ">First Name</label>
                        <input
                        className="pl-6 block border border-gray-300 w-full h-10 rounded-lg  bg-gray-50"
                        type="text"
                        placeholder={user.first_name}
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="block mb-6 lg:mb-0 lg:block lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3 ">Last Name</label>
                        <input
                        className="pl-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50 "
                        type="text"
                        placeholder={user.last_name}
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}

                        />
                    </div>
                    <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">E-mail</label>
                        <input
                        className="pl-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type="text"
                        placeholder={user.email_user}
                        value={email_user}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6  xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">Phone Number</label>
                        <div className=" bg-gray-50 flex items-center border border-gray-300 rounded-lg lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <button className="px-4 font-sans tracking-wider text-black">
                            +62
                        </button>
                        <div className="border-r h-8" />
                        <input
                            type="text"
                            className="h-11 pl-5 w-full lg:w-[100%] lg:max-w-[300px] rounded-lg bg-gray-50"
                            placeholder={user.phone_number ? user.phone_number.slice(3):'update your phone number' }
                            value={phone_number}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                        </div>
                    </div>

                    </form>
                </div>

                </div>
                <button onClick={updateUserData} className="block mx-auto lg:mx-0 bg-primary text-white w-[80%] max-w-xl lg:max-w-xs p-2 my-10 rounded-lg wider hover:opacity-50 active:opacity-100 active:bg-gray-100 active:text-primary border active:border-primary">
                    Update changes
                </button>
                <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Status</h3>
                    {
                       status === undefined ? <p>Please wait for updating data</p> : status == 200 ? <p>Update data user success</p> : <p> add movie failed</p>

                    }
                    <div className="modal-action">
                    <button className="btn" type='button' onClick={() => navigate(0)}>Close</button>
                    </div>
                </form>
                </dialog>
            </section>
            <section className="block mx-auto max-w-2xl lg:mx-0 lg:max-w-none ">
                <div className="mx-3 mt-8 lg:mx-0">
                <div className="bg-white p-6 rounded-lg ">
                    <p className="border-b mb-10 border-gray-300 pb-2 text-lg">
                    Account and Privacy
                    </p>
                    <form className="tracking-wider lg:flex lg:gap-x-10 " method='POST' encType="multipart/form-data" onSubmit={updatePassword}>
                    <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">New Password</label>
                        <input
                        className="px-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type='password'
                        placeholder='Write your password'
                        value={password_user}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">Confirm</label>
                        <input
                        className="px-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        />
                        {
                            !confirPassword ? '' : confirPassword !== password_user ? <p> Password not same, input again</p> : ''
                        }
                    </div>
                    </form>
                </div>
                <button onClick={updatePassword} className="block mx-auto lg:mx-0 bg-primary text-white w-[80%] max-w-xl lg:max-w-xs p-2 my-10 rounded-lg wider hover:opacity-50 active:opacity-100 active:bg-gray-100 active:text-primary border active:border-primary">
                    Update changes
                </button>
                <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Status</h3>
                    {
                       status === undefined ? <p>Please wait for updating data</p> : status == 400 ? <p>PASSWORD NOT SAME, INPUT AGAIN</p> : status == 200 && password_user ? <p>Update password success</p> : <p> update password failed</p>

                    }
                    <div className="modal-action">
                    <button className="btn" type='button' onClick={() => navigate(0)}>Close</button>
                    </div>
                </form>
                </dialog>
                </div>
            </section>
            </div>
        </div>
    </main>

    <Footer />
    
    </>
  )
}

export default Profil