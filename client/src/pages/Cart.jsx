import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {billing, clearCart, getCart} from "../http/userAPI";
import {Spinner} from "react-bootstrap";

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [comment, setComment] = useState(0);

    const postBill = async () => {
        setLoading(true);
        let formData = new FormData();
        formData.append('comment', comment);
        await billing(formData);
        setItems([]);
        setTotalCost(0);
        setLoading(false);
    }

    const clear = async () => {
        setLoading(true);
        await clearCart();
        setItems([]);
        setTotalCost(0);
        setLoading(false);
    }

    const authUserPrepare = async (items) => {
        for (let i = 0; i < items.length; i++) {
            items[i].count = items[i].name.split('//')[1];
            items[i].name = items[i].name.split('//')[0];
            setTotalCost(totalCost + items[i].cost * items[i].count)
        }
        return items;
    }

    useEffect(() => {
        setTimeout(() => {
            getCart().then(async data => {
                setItems(await authUserPrepare(data.data));
            }).finally(() => setLoading(false))
        }, 1000);
    });

    if (loading) {
        return(
            <div className='d-flex align-items-center'>
                <strong>Loading...</strong>
                <Spinner className='ms-auto' role='status' />
            </div>
        );
    }

    return (
        <div>
            <section className="banner-area service" id="service">
                <div className="container h-100">
                    <div className="banner-area__content text-center">
                        <h1>Корзина</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Корзина</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="section-margin--large">
                <div className="container">
                    <h1>Корзина</h1>
                    {totalCost > 0 && <div className="table-responsive-sm">
                        <table className="table table-hover">
                            <tbody>
                            <tr>
                                <th className="d-none d-md-block">Фото</th>
                                <th>Наименование</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Стоимость</th>
                            </tr>
                            {items.map(function (data, index) {
                                return (
                                    <tr key={index}>
                                        <td className="d-none d-md-block custom-cart">
                                            <img className="img-thumbnail"
                                                 src={"data:image;base64," + data.image}
                                                 alt="item"/></td>
                                        <td className="align-middle">{data.name}</td>
                                        <td className="align-middle">{data.cost}</td>
                                        <td className="align-middle text-center">{data.count}</td>
                                        <td className="align-middle">{data.count * data.cost}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a role="button" className="btn btn-secondary" onClick={event => clear()}>Очистить</a>
                            <input type="text" id="comment" onChange={e => setComment(e.target.value)}
                                   className="form-control input-lg"
                                   placeholder="Комментарий"/>
                            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                            <input value="Заказать" type="submit" role="button"
                                   className="btn btn-secondary" onClick={event => postBill()}/>
                                <button type="button" disabled className="btn btn-success">{totalCost}</button>
                        </div>
                    </div>}

                    {totalCost === 0 && <div>
                        <h3>Ваша корзина пуста</h3>
                    </div>
                    }
                </div>
            </section>
        </div>
);
};

export default Cart;