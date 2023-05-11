import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Context} from "../index";
import dayjs from "dayjs";
import {acceptRes, getRes} from "../http/userAPI";
import {Spinner} from "react-bootstrap";

require('dayjs/locale/es')
const Reserve = () => {
    const {user} = useContext(Context);
    dayjs.locale('ru');
    const [loading, setLoading] = useState(true);
    const [res, setRes] = useState({});
    const [alert, setAlert] = useState(false);
    const [alertMes, setAlertMes] = useState('');
    const [success, setSuccess] = useState(false);
    const accept = async (number) =>{
        await acceptRes(number, user).then(data => {
            reload();
            setSuccess(true);
        }).catch(e =>{
            setAlertMes("Вы уже резервировали время или данное время уже зарезервировано другим пользователем");
            setAlert(true);
        })
    }

    useEffect(() => {
        setTimeout(() => {
            getRes().then(data => {
                setRes(data.data);
            }).finally(() => setLoading(false))
        }, 1000);
    }, []);


    const reload = async () => {
        setLoading(true);
        setTimeout(() => {
            getRes().then(data => {
                setRes(data.data);
            }).finally(() => setLoading(false))
        }, 1000);
    }

    if (loading) {
        return (
            <div className='d-flex align-items-center'>
                <strong>Loading...</strong>
                <Spinner className='ms-auto' role='status'/>
            </div>
        );
    }
    return (
        <div>
            <section className="banner-area service" id="service">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        <h1>Запись</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Запись</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="section-margin--large">
                <div className="container">
                    <h1>Записи в Rezka Barber</h1>
                    <h3>Наш барбер принимает онлайн-запись на следующий день.<br></br>
                        Чтобы записаться в наш барбер, нажмите на удобное время. Вам придет сообщение на email с
                        уведомлением.</h3>
                    <br></br>
                    {alert &&
                        <div className="alert alert-danger text-black text-black" role="alert">
                            {alertMes}
                        </div>
                    }
                    {success &&
                        <div className="alert alert-success text-black text-black" role="alert">
                            Вы успешно записались в Rezka Barber. Информация отправлена на почту!
                        </div>
                    }
                    {!user.isAuth && <h3>Вы не авторизованы. После авторизации вы сможете записаться</h3>}
                    {user.isAuth && <h3>{dayjs().add(1, "days").format('D MMMM')}</h3>}
                    <div>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c1 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(1)}}>10:00</a>}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c2 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(2)}}>10:30</a>}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c3 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(3)}}>11:00</a>}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c4 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(4)}}>11:30</a>}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c5 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(5)}}>12:00</a>}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c6 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(6)}}>12:30</a>}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c7 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(7)}}>13:00</a>}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {res.c8 && <a className="btn btn-outline-success me-1 mt-1" href={'#'} role="button" onClick={() => {accept(8)}}>13:30</a>}
                    </div>
                </div>
                <br></br>
            </section>
        </div>
    )
        ;
};

export default Reserve;