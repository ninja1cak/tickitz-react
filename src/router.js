import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './page/signin'
import Signup from './page/signup'
import Home from './page/home'
import Listmovie from './page/listmovie/listmovie'
import DetailMovie from './page/detailmovie'
import DashboardAdmin from './page/dashboardAdmin/index'
import UpdateMovie from './page/dashboardAdmin/update'
import Profil from './page/profilpage'

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Signin />} />
                <Route path='/login/:verify' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/list/' element={<Listmovie />} />
                <Route path='/detail/:id' element={<DetailMovie />} />
                <Route path='/admin' element={<DashboardAdmin />}/>            
                <Route path= '/update/:idMovie' element={<UpdateMovie />} />
                <Route path= '/profil' element={<Profil />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Router