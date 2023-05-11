import React from 'react';


import team1 from '../static/img/team/team1.png';
import team2 from '../static/img/team/team2.jpg';
import team3 from '../static/img/team/team3.jpg';
import {NavLink} from "react-router-dom";
const Team = () => {
    return (
        <div>
            <section className="banner-area team" id="team">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        <h1>Наша команда</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Наша команда</li>
                            </ol>
                        </nav>
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

        </div>
    );
};

export default Team;