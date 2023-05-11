import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import jwt_decode from 'jwt-decode';
import logo from '../static/logo.png';
import '../static/css/main.css';

const NavBar = observer(() => {

    const {user} = useContext(Context);
    let email = 'Unauthorized';
    try {
        email = jwt_decode(localStorage.getItem('token')).email;
    } catch (e) {
        //заглушка от неавторизованных пользователей
    }

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        user.setRole("USER");
    }

    return (
        <header className="header_area">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg main_box">
                    <div className="container">
                        <NavLink className="navbar-brand logo_h" to={'/'}><img src={logo} alt=""/>Rezka</NavLink>
                        <button className="navbar-toggler navbar-toggler-icon" data-mdb-toggle="collapse" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                        </button>
                        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul className="nav navbar-nav ms-auto">
                                <li className="nav-item"><NavLink className="nav-link" to={'/'}>Главная</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to={'/service'}>Цены/услуги</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to={'/reserve'}>Записаться</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to={'/shop'}>Магазин</NavLink></li>

                                <li className="nav-item submenu dropdown">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a href='#' className="nav-link dropdown-toggle" data-toggle="dropdown"
                                       role="button" aria-haspopup="true"
                                       aria-expanded="false">Мы</a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item"><NavLink className="nav-link" to={'/about-us'}>О нас</NavLink></li>
                                        <li className="nav-item"><NavLink className="nav-link"  to={'/team'}>Команда</NavLink></li>
                                        <li className="nav-item"><NavLink className="nav-link"  to={'/contact'}>Контакты</NavLink>
                                        </li>
                                    </ul>
                                </li>

                                {!user.isAuth && <li className="nav-item">
                                    <NavLink className="nav-link" to={'login'}>Войти</NavLink>
                                </li>}

                                {user.isAuth && <li className="nav-item submenu dropdown">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"
                                       role="button" aria-haspopup="true"
                                       aria-expanded="false">{email}</a>
                                    <ul className="dropdown-menu">
                                        {user.isAdmin && <li className="nav-item"><NavLink
                                            className="nav-link" to={'/admin'}>Добавить товар</NavLink></li>}
                                        <li className="nav-item"><NavLink className="nav-link" to={'/orders'}>Заказы</NavLink></li>
                                        <li className="nav-item"><NavLink className="nav-link" to={'/lk'}>ЛК</NavLink></li>
                                        <li className="nav-item"><NavLink className="nav-link"  to={'/cart'}>Корзина</NavLink></li>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <li className="nav-item" onClick={logOut}><a className='nav-link' href='#'>Выйти</a></li>
                                    </ul>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
});

export default NavBar;