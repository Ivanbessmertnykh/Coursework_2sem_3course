import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import {change} from "../http/userAPI";

const Lk = () => {
    const {user} = useContext(Context);
    const [username, setUsername] = useState(jwt_decode(localStorage.getItem('token')).name);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(jwt_decode(localStorage.getItem('token')).email);

    const changeCreds = async () => {
        try{
            const data = await change(email, password, username);
            localStorage.setItem('token', data);
            user.setUser(data);
            user.setIsAuth(true);
        }catch (e){
        }finally {
            window.location.href="/";
        }
    }

    return (
        <div>
            <section className="banner-area service" id="service">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        <h1>Личный кабинет</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Личный кабинет</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="section-margin--large">
                <div className="container">
                    <div>
                        <h1 className="text-center mb-3">Личный кабинет</h1>
                        <div>Имя: <b>{username}</b></div>
                        <div>Пароль: <b>Скрыто</b></div>
                        <div>Email: <b>{email}</b></div>
                        <br></br>
                        <input type="text"
                               className="form-control input-lg"
                               placeholder="Имя" value={username} onChange={event => setUsername(event.target.value)}
                               required/>
                        <br></br>
                        <input type="password"
                               className="form-control input-lg"
                               placeholder="Пароль" value={password} onChange={event => setPassword(event.target.value)}
                               required/>
                        <br></br>
                        <input type="text"
                               className="form-control input-lg"
                               placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}
                               required/>
                        <br></br>
                        <div onClick={event => changeCreds()} className="btn btn-danger btn-block"
                        >Изменить
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Lk;