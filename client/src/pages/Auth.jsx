import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigation = useNavigate();
    const isLogin = location.pathname === '/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMes, setAlertMes] = useState('');

    const universal = async (e) => {
        e.preventDefault();
        try{
            let data;
            if (isLogin) {
                data = await login(email, password);
                user.setRole(data.role);
            }
            else{
                data = await registration(email, password, username);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigation('/');
        } catch (e) {
            if (isLogin)
                setAlertMes("Неверные данные для входа");
            else
                setAlertMes("Возможные ошибки: Пользователь с данным email уже зарегистрирован или Пароль не удовлетворяет требованиям длины (минимум 5)");
            setAlert(true);
        }
    };
    return (
        <div>
            <section className="banner-area service" id="service">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        {isLogin && <h1>Вход</h1>}
                        {!isLogin && <h1>Регистрация</h1>}
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                {isLogin && <li className="breadcrumb-item active" aria-current="page">Вход</li>}
                                {!isLogin && <li className="breadcrumb-item active" aria-current="page">Регистрация</li>}
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="section-margin--large">
                <div className="container">
                    <div>
                        <div>
                            {isLogin && <h1>Войдите в свой аккаунт</h1>}
                            {!isLogin && <h1>Зарегистрируйтесь</h1>}
                            <figure>
                                {isLogin && <figcaption className="blackquote-footer">
                                    Вход в аккаунт позволит вам записаться на прием в нашу великолепную Rezka Barber!
                                </figcaption>}
                            </figure>
                            {alert &&
                                <div className="alert alert-danger text-black text-black" role="alert">
                                    {alertMes}
                                </div>
                            }

                            <div className="form-group">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control input-lg"
                                       placeholder="Email" required={true}/>
                            </div>
                            <br></br>
                                <div className="form-group">
                                    <input type='password' onChange={e => setPassword(e.target.value)} value={password}
                                           className="form-control input-lg"
                                           placeholder="Пароль" required={true}/>
                                </div>
                            {!isLogin &&
                            <div className="form-group">
                                <br></br>
                                <input type='text' onChange={e => setUsername(e.target.value)} value={username}
                                       className="form-control input-lg"
                                       placeholder="Имя" required={true}/>
                            </div>}
                                <br></br>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div onClick={universal} className="btn btn-lg btn-primary btn-block">
                                                {isLogin && 'Войти'}
                                                {!isLogin && 'Зарегистрироваться'}
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                        </div>
                                    </div>
                        </div>
                    </div>
                    <br></br>
                    {isLogin && <NavLink to={'/register'} className="btn btn-outline-success">Зарегистрироваться</NavLink>}
                </div>
            </section>
        </div>
        // <div className='container d-flex justify-content-center align-items-center p-4'>
        //
        //         <form className='d-flex flex-column'>
        //
        //             {alert &&
        //                 <div className="alert alert-light text-danger text-black" role="alert">
        //                     {alertMes}
        //                 </div>
        //             }
        //
        //             <h3 className='text-decoration-underline'>{isLogin && 1 ? 'Войти' : 'Регистрация'}</h3>
        //             <input type='email' onChange={e => setEmail(e.target.value)} value={email} className='mt-2 form-control' placeholder='Введите email..'/>
        //             <input type='password' onChange={e => setPassword(e.target.value)} value={password} className='mt-2 form-control' placeholder='Введите пароль..'/>
        //
        //             {isLogin &&
        //             <div className="mt-3 btn-group" aria-label="Basic example">
        //                 <button onClick={universal} className='btn btn-dark border-danger'>Войти</button>
        //                 <button className='btn btn-dark border-danger'><NavLink className='text-decoration-none text-white' to='/registration'>Зарегистрироваться</NavLink></button>
        //             </div>
        //             }
        //             {!isLogin &&
        //                 <button onClick={universal} className='mt-3 btn btn-dark border-danger'>Зарегистрироваться</button>
        //             }
        //         </form>
        //
        // </div>
    );
});

export default Auth;