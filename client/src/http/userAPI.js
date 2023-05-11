import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (email, password, username) => {
    const {data} = await $host.post('api/auth/register', {email, password, username});
    localStorage.setItem('token', data);
    return jwt_decode(data);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password});
    localStorage.setItem('token', data);
    return jwt_decode(data);
}
export const check = async () => {
    const {data} = await $authHost.get('api/auth/check', );
    localStorage.setItem('token', data);
    return jwt_decode(data);
}

export const change = async (email, password, username) => {
    const {data} = await $authHost.post('/api/auth/change', {email, password, username})
    return data;
}

export const getRes = async () => {
    const data = await $host.get('/api/res/check', );
    return data;
}

export const acceptRes = async (number, user) => {
    const data = await $authHost.post('/api/res/accept/?number=' + number);
    return data;
}

export const addItemToServer = async (formData) =>{
    const data = await $authHost.post('/api/item/add', formData);
    return data;
}

export const getAllItems = async () => {
    const data = await $authHost.get('/api/item/check', );
    return data;
}

export const changeItem = async (formData) =>{
    const data = await $authHost.post('/api/item/change', formData);
    return data;
}

export const clearCart = async () =>{
    const data = await $authHost.get('/api/item/cart/clear', );
    return data;
}

export const getCart = async () =>{
    const data = await $authHost.get('/api/item/cart', );
    return data;
}

export const getPerformed = async () =>{
    const data = await $authHost.get('/api/item/cart/performed', );
    return data;
}
export const billing = async (formData) =>{
    const data = await $authHost.post('/api/item/cart/billing', formData);
    return data;
}
