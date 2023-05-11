import React from 'react';
import heroBanner from '../static/img/banner/hero-banner.png';
import barberFrame from '../static/img/home/barber-frame.png';
import barberWork from '../static/img/home/barber-work.png';
import team1 from '../static/img/team/team1.png';
import team2 from '../static/img/team/team2.jpg';
import team3 from '../static/img/team/team3.jpg';

import '../static/css/main.css';
import '../static/vendors/flat-icon/flaticon.css';
import '../static/vendors/flat-icon/_flaticon.scss';

const Greet = () => {
    return (
        <main className="site-main">
            <section className="hero-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="hero-banner__img">
                                <img className="img-fluid" src={heroBanner} alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6 pl-xl-4">
                            <div className="hero-banner__content">
                                <h1>Мы специализируемся на всех типах волос</h1>
                                <p>Наша компания сделает из любого человека завидного красавца, даже не сомневайтесь в
                                    этом!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-margin about-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="about__content">
                                <div className="section-intro">
                                    <h4 className="section-intro__title">О нас</h4>
                                    <h2 className="section-intro__subtitle">Мы художники, волосы — наш холст</h2>
                                </div>
                                <p>25 лет на рынке России. Мы точно знаем наших клиентов и предлагаем только услуги
                                    качества "Премиум". Не обращайтесь к энтузиастам, выбирайте профессионалов!</p>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-2">
                            <div className="about__img">
                                <img className="img-fluid" src={barberFrame} alt=""/>
                                    <img src={barberWork} alt="" className="about__img--small img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-margin--large">
                <div className="container">
                    <div className="section-intro pb-70px">
                        <h4 className="section-intro__title">Расширенные услуги</h4>
                        <h2 className="section-intro__subtitle">Наша сила в вашей <span className="d-block">Безупречной красоте</span>
                        </h2>
                    </div>

                    <div className="row gutters-48">
                        <div className="col-md-6 col-xl-3 mb-5 mb-xl-0">
                            <div className="card text-center card-feature border-style">
                                <div className="card-feature__icon"><i className="flaticon-barber-chair"></i></div>
                                <h3 className="card-feature__title">Лучшее место</h3>
                                <p>Мы находимся в центре прекрасной Москвы, добраться до нас не составит сложностей</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-3 mb-5 mb-xl-0">
                            <div className="card text-center card-feature border-style">
                                <div className="card-feature__icon"><i className="flaticon-cut"></i></div>
                                <h3 className="card-feature__title">Лучшее оборудование</h3>
                                <p>Мы выбираем только лучшие бренды инструментов, чтобы вы были на высоте</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-3 mb-5 mb-xl-0">
                            <div className="card text-center card-feature border-style">
                                <div className="card-feature__icon"><i className="flaticon-mirror"></i></div>
                                <h3 className="card-feature__title">Лучший стиль</h3>
                                <p>Делаем стильно, молодежно, стильно, престижно. Вы станете иконой, на которую будут
                                    равняться</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-3 mb-5 mb-xl-0">
                            <div className="card text-center card-feature border-style">
                                <div className="card-feature__icon"><i className="flaticon-barbershop"></i></div>
                                <h3 className="card-feature__title">Команда экспертов</h3>
                                <p>Вас будут обслуживать профессионалы своего дела, которые обучались данному ремеслу у
                                    величайших</p>
                            </div>
                        </div>
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

            <section className="section-padding--large bg-soapstone">
                <div className="container">
                    <div className="section-intro pb-70px">
                        <h4 className="section-intro__title">Наша команда</h4>
                        <h2 className="section-intro__subtitle">Опыт персонала <span className="d-block">Ваш вид</span>
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div className="card card-team">
                                <div className="card-team__img">
                                    <img className="card-img rounded-0" src={team1} alt=""/>
                                </div>
                                <div className="card-team__position">
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <div className="card-team__bio">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <h4><a href="#">Алексей Ножничкин</a></h4>
                                            <p>Специалист по волосам</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div className="card card-team">
                                <div className="card-team__img">
                                    <img className="card-img rounded-0" src={team2} alt=""/>
                                </div>
                                <div className="card-team__position">
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <div className="card-team__bio">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <h4><a href="#">Дмитрий Подстрижанькин</a></h4>
                                            <p>Специалист по волосам</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div className="card card-team">
                                <div className="card-team__img">
                                    <img className="card-img rounded-0" src={team3} alt=""/>
                                </div>
                                <div className="card-team__position">
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <div className="card-team__bio">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <h4><a href="#">Жан Пежо</a></h4>
                                            <p>Специалист по волосам</p>
                                        </div>
                                    </div>
                                </div>
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
        </main>
);
};

export default Greet;