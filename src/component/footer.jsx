import React from 'react'
import Logo from '../assets/img/homepage/logo.png'
import ebv from '../assets/img/homepage/ebv.png'
import hiflix from '../assets/img/homepage/hiflix.png'
import cineone from '../assets/img/homepage/cineone.png'
import facebookIcon from '../assets/img/homepage/eva_facebook-outline.png'
import twitterIcon from '../assets/img/homepage/eva_twitter-outline.png'
import instagramIcon from '../assets/img/homepage/bx_bxl-instagram.png'
import youtubeIcon from '../assets/img/homepage/feather_youtube.png'

function Footer() {
  return (
    <footer className="bg-white flex-col py-20 text-gray-400 font-sans font-normal tracking-wider">
    <div className="mx-auto mb-10 max-w-7xl flex flex-col lg:flex-row justify-between px-4 sm:px-6 lg:px-8">
        <div className="w-72">
        <img src={Logo} className="mb-5 h-10 object-contain" />
        <p>
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </p>
        </div>
        <div>
        <nav className="my-10 lg:my-0">
            <p className="text-black mb-5">
            <strong>Explore</strong>
            </p>
            <div className="flex lg:flex-col gap-3">
            <a>Home</a>
            <a href="index.html">List movie</a>
            </div>
        </nav>
        </div>
        <div>
        <p className="text-black mb-5">
            <strong>Our Sponsor</strong>
        </p>
        <div className="flex gap-5 mb-3 items-center lg:items-start lg:flex-col  ">
            <img src={ebv} className="h-7 object-contain" />
            <img src={cineone} className="h-5 object-contain" />
            <img src={hiflix} className="h-6 object-contain" />
        </div>
        </div>
        <div className="my-10 lg:my-0">
        <p className="text-black mb-5">
            <strong>Follow us</strong>
        </p>
        <div className="flex lg:flex-col gap-7 lg:gap-5">
            <nav className="flex items-center gap-2">
            <img
                src={facebookIcon}
                className="h-5 inline object-contain"
            />
            <a className="hidden lg:inline-block"> Tickitz Cinema id</a>
            </nav>
            <nav className="flex items-center gap-2">
            <img
                src={instagramIcon}
                className="h-5 inline object-contain"
            />
            <a className="hidden lg:inline-block"> tickitz.id</a>
            </nav>
            <nav className="flex items-center gap-2">
            <img
                src={twitterIcon}
                className="h-5 inline object-contain"
            />
            <a className="hidden lg:inline-block">tickitz.id</a>
            </nav>
            <nav className="flex items-center gap-2">
            <img
                src={youtubeIcon}
                className="h-5 inline object-contain"
            />
            <a className="hidden lg:inline-block"> Tickitz Cinema id</a>
            </nav>
        </div>
        </div>
    </div>
    <p className="text-gray-700 text-center tracking-wider">
        © 2020 Tickitz. All Rights Reserved.
    </p>
    </footer>
  )
}

export default Footer