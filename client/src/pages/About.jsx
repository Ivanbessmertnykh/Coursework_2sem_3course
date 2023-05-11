import React from 'react';
import barberFrame from '../static/img/home/barber-frame.png';
import barberWork from '../static/img/home/barber-work.png';
import {NavLink} from "react-router-dom";

const About = () => {
    return (
        <div>
            <section className="banner-area about" id="about">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        <h1>О нас</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">О нас</li>
                            </ol>
                        </nav>
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
        </div>
    );
};

export default About;