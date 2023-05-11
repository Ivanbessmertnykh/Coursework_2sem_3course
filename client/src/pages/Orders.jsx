import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {getPerformed} from "../http/userAPI";
import {Context} from "../index";
import {Spinner} from "react-bootstrap";

const Orders = () => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const authUserPrepare = async (orders) => {
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].orderDishEnrolls.length; j++) {
                orders[i].orderDishEnrolls[j].item.count = orders[i].orderDishEnrolls[j].item.name.split('//')[1];
                orders[i].orderDishEnrolls[j].item.name = orders[i].orderDishEnrolls[j].item.name.split('//')[0];
            }
        }
        return orders;
    }

    useEffect(() => {
        setTimeout(() => {
            getPerformed().then(async data => {
                setItems(await authUserPrepare(data.data));
            }).finally(() => setLoading(false))
        }, 2000);
    }, [user]);

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
                        <h1>Заказы</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Заказы</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="section-margin--large">
                <div className="container">
                    <h1>Заказы</h1>
                    {items.map(function (data, index) {
                        return(
                            <div key={index} className="table-responsive-sm">
                                <h3>Комментарий: <span>{data.comment}</span></h3>
                                <h3>Время заказа: <span>{data.time}</span></h3>
                                <table className="table table-hover">
                                    <tbody>
                                    <tr>
                                        <th className="d-none d-md-block">Фото</th>
                                        <th>Наименование</th>
                                        <th>Цена</th>
                                        <th>Количество</th>
                                        <th>Стоимость</th>
                                    </tr>
                                    {data.orderDishEnrolls.map(function (data, index) {
                                        return (
                                            <tr key={index}>
                                                <td className="d-none d-md-block custom-cart">
                                                    <img className="img-thumbnail"
                                                         src={"data:image;base64," + data.item.image}
                                                         alt="item"/></td>
                                                <td className="align-middle">{data.item.name}</td>
                                                <td className="align-middle">{data.item.cost}</td>
                                                <td className="align-middle text-center">{data.item.count}</td>
                                                <td className="align-middle">{data.item.count * data.item.cost}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                                <br></br>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Orders;