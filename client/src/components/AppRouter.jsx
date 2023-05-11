import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import Greet from "../pages/Greet";
import Auth from "../pages/Auth";
import {Context} from "../index";
import AdminPrev from "../pages/AdminPrev";
import {observer} from "mobx-react-lite";
import Items from "../pages/Items";
import Service from "../pages/Service";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Team from "../pages/Team";
import Reserve from "../pages/Reserve";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import LK from "../pages/LK";

const AppRouter = observer( () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            <Route path='*' element={<Greet/>}/>
            <Route path='/login' element={<Auth/>}/>
            <Route path='/register' element={<Auth/>}/>
            <Route path='/service' element={<Service/>}/>
            <Route path='/about-us' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path='/reserve' element={<Reserve/>}/>
            <Route path='/shop' element={<Items/>}/>
            {user.isAuth && <Route path='/cart' element={<Cart/>}/>}
            {user.isAuth && <Route path='/orders' element={<Orders/>}/>}
            {user.isAuth && <Route path='/lk' element={<LK/>}/>}
            {user.isAdmin && <Route path='/admin' element={<AdminPrev/>}/>}
        </Routes>
    );
});

export default AppRouter;