import React from 'react'
import Avenger from '../assets/img/SignUp/avenger.png'
import Logo from '../assets/img/SignUp/tickitz.png'
import LogoColor from '../assets/img/homepage/logo.png'

function HeaderSign() {
  return (
    <>
                <div className="hidden lg:block lg:relative bg-primary w-[55%]">
                <img
                src={Avenger}
                className="object-contain opacity-40 xl:w-full"
                />
                <div
                className=" absolute text-center  w-[50%] h-[20%] top-0 bottom-0 left-0 right-0 m-auto"
                id="signUp"
                >
                <img src={Logo} className="w-96 m-auto" />
                <div className="text-white text-4xl font-light ">wait, watch, wow!</div>
                </div>
            </div>
            <img
                className="w-24 ml-5 mt-14 lg:hidden"
                src={LogoColor}
                alt="logo"
            />
    </>
  )
}

export default HeaderSign