import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Form, Spinner} from "react-bootstrap";
import {addItemToServer} from "../http/userAPI";

const AdminPrev = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const addItem = async (e) => {
        e.preventDefault();
        try {
            if (!name || !price || !image) {
                return -1;
            }
            let formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('image', image);
            await addItemToServer(formData);
            await reload();
        } catch (e) {
            alert(e.response.data.message);
        }

    }
    const reload = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
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
                        <h1>Добавить товар</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={'/'}>Главная</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Добавить товар</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="section-margin--large">
                <div className="container">
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                        <h3>Меню добавления товара</h3>
                        <br></br>
                        <div>
                            <Form>
                                <Form.Control
                                    required
                                    placeholder={"Имя"}
                                    type={"text"}
                                    className={'m-2'}
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                >
                                </Form.Control>
                                <br></br>
                                <Form.Control
                                    required
                                    placeholder={"Цена"}
                                    type={"number"}
                                    className={'m-2'}
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                >
                                </Form.Control>
                                <br></br>
                                <Form.Control
                                    required
                                    placeholder={"Картинка"}
                                    accept={"image/*"}
                                    type={"file"}
                                    className={'m-2'}
                                    onChange={e => setImage(e.target.files[0])}
                                >
                                </Form.Control>
                                <br></br>
                            </Form>
                            <div onClick={(e) => {
                                addItem(e)
                            }} className="btn btn-success col-xs-6 col-sm-6 col-md-6">
                                Добавить товар
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminPrev;