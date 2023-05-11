import React, {useContext, useEffect, useState} from 'react';
import {changeItem, getAllItems} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import '../static/css/main.css';
import {Context} from "../index";
import 'dayjs/locale/ru'
import {NavLink} from "react-router-dom";


const Items = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const universal = async (changeKey, number) => {
        setLoading(true);
        let formData = new FormData();
        formData.append('changeKey', changeKey);
        formData.append('number', number);
        await changeItem(formData);
        setLoading(false);
    }

    const authUserPrepare = async (items) => {
        for (let i = 0; i < items.length; i++) {
            items[i].count = items[i].name.split('//')[1];
            items[i].name = items[i].name.split('//')[0];
        }
        return items;
    }

    useEffect(() => {
        setTimeout(() => {
            getAllItems().then(async data => {
                if (user.isAuth)
                    setItems(await authUserPrepare(data.data));
                else
                    setItems(data.data);
            }).finally(() => setLoading(false))
        }, 1000);
    }, [user]);


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
                        <h1>Магазин</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Магазин</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <h3 className='text-center mt-3'>Магазин</h3>

            <section className="section-margin--large">
                <div className="container">
                    <div className="d-flex flex-row flex-wrap justify-content-md-between justify-content-center">
                            {items.map(function (data, index) {
                                return (
                                    // eslint-disable-next-line react/style-prop-object
                                    <div key={index} className="card item-custom mt-3">
                                        <img src={'data:image;base64,' + data.image}
                                             className="card-img-top" alt="item"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{data.name}</h5>
                                            <p className="card-text"></p>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a role="button" className="btn btn-secondary"
                                                   onClick={(e) => {universal(0, data.itemID); if(data.count !== 0) data.count--}}>-</a>
                                                <button type="button" disabled
                                                        className="btn btn-secondary">
                                                    {user.isAuth && data.count}
                                                    {!user.isAuth && '0'}
                                                </button>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a role="button" className="btn btn-secondary"
                                                   onClick={(e) => {universal(1, data.itemID); data.count++}}>+</a>
                                                <button type="button" disabled
                                                        className="btn btn-success">{data.cost}</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </section>
        </div>
    );
});

export default Items;