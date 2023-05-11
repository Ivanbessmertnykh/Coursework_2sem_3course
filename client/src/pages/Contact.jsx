import React from 'react';
import {NavLink} from "react-router-dom";

const Contact = () => {
    return (
        <div>
            <section className="banner-area contact" id="contact">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        <h1>Контакты</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Контакты</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="section-margin">
                <div className="container">
                    <div className="row justify-content-end d-sm-block mb-5 pb-4">
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1122.4470707982778!2d37.628818516537635!3d55.76034109654578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5c32be8035%3A0x327c045ebcfec6bd!2sMoscow%20spiritual%20Consistory%20building!5e0!3m2!1sru!2sru!4v1652796413221!5m2!1sru!2sru"
                            width="600" height="420" allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="row justify-content-around">
                        <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-home"></i></span>
                                <div className="media-body">
                                    <h3>Москва, Российская Федерация</h3>
                                    <p>Мясницкая, 3</p>
                                </div>
                            </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-headphone"></i></span>
                                <div className="media-body">
                                    <h3><a href="tel:+79457777777">+7(945)777-77-77</a></h3>
                                    <p>Каждый день с 10 до 14</p>
                                </div>
                            </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-email"></i></span>
                                <div className="media-body">
                                    <h3><a href="mailto:rezkabarber@gmail.com">rezkabarber@gmail.com</a></h3>
                                    <p>Поддержка круглосуточно!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;