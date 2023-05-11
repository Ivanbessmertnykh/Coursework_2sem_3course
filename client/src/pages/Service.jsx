import React from 'react';
import {NavLink} from "react-router-dom";

const Service = () => {
    return (
        <div>
            <section className="banner-area service" id="service">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        <h1>Наши услуги</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Наши услуги</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="section-margin--large">
                <div className="container">
                    <div className="section-intro pb-70px">
                        <h4 className="section-intro__title">Наши услуги</h4>
                        <h2 className="section-intro__subtitle">Наша сила в вашей <span className="d-block">Безупречной красоте</span>
                        </h2>
                    </div>
                    <div className="row gutters-48 card-service-wrapper">
                        <div className="col-lg-4">
                            <div className="card text-center card-service border-style">
                                <div className="card-service__icon"><i className="flaticon-cut"></i></div>
                                <h3 className="card-service__title">Стильная стрижка</h3>
                                <p>Покажите всему миру вашу безупречную мужскую стрижку</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card text-center card-service border-style">
                                <div className="card-service__icon"><i className="flaticon-wellness"></i></div>
                                <h3 className="card-service__title">Стрижка и прическа</h3>
                                <p>Мы сможем сделать все, что вы пожелаете. Хотите стать дедом морозом или серьезным
                                    брокером? Без проблем</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card text-center card-service border-style">
                                <div className="card-service__icon"><i className="flaticon-shower"></i></div>
                                <h3 className="card-service__title">Окрашивание и мытье волос</h3>
                                <p>Окрашиваем во все цвета радуги и не только. Весь спектр RGB к вашим услугам</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-margin--large pricing-relative">
                <div className="container">
                    <div className="section-intro pb-70px">
                        <h4 className="section-intro__title">Цены</h4>
                        <h2 className="section-intro__subtitle">Выберите ваш <span className="d-block">Пакет</span></h2>
                    </div>
                    <div className="row gutters-48">
                        <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                            <div className="card text-center card-pricing border-style">
                                <div className="card-pricing__header">
                                    <h3>Стандарт</h3>
                                    <p>Стандартный пакет</p>
                                </div>
                                <div className="card-pricing__price">
                                    <h2>₽3490</h2>
                                </div>
                                <ul className="card-pricing__list">
                                    <li>Базовая стрижка</li>
                                    <li>Базовое бритье</li>
                                    <li>Базовое мытье головы</li>
                                    <li>Базовый массаж</li>
                                    <li>Базовые снэки</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                            <div className="card text-center card-pricing border-style">
                                <div className="card-pricing__header">
                                    <h3>Иностранец</h3>
                                    <p>Обворожительный пакет</p>
                                </div>
                                <div className="card-pricing__price">
                                    <h2>₽4490</h2>
                                </div>
                                <ul className="card-pricing__list">
                                    <li>Французская стрижка</li>
                                    <li>Бритье а-ля Френч</li>
                                    <li>Цветочное мытье головы</li>
                                    <li>Расслабляющий массаж</li>
                                    <li>Круассаны и вино</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                            <div className="card text-center card-pricing border-style">
                                <div className="card-pricing__header">
                                    <h3>Самурай</h3>
                                    <p>Лучше не бывает</p>
                                </div>
                                <div className="card-pricing__price">
                                    <h2>₽6990</h2>
                                </div>
                                <ul className="card-pricing__list">
                                    <li>Древнеяпонская стрижка</li>
                                    <li>Бритье JDM</li>
                                    <li>Мытье священной водой</li>
                                    <li>Массаж "Сакура"</li>
                                    <li>Премиум Авамори и саке</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Service;