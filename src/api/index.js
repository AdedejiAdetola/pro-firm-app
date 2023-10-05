import axios from "axios";

// const URL = process.env.REACT_APP_SERVER_URL

const URL = 'https://profirmapi.onrender.com'

// console.log(URL);

// const URL = 'https://6c19-196-220-255-6.ngrok-free.app/api/v1'

const API = axios.create({  baseURL: URL });


API.interceptors.request.use((req) => {
    // console.log('localstorage',localStorage.getItem('profile'))
    
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token }`
        // console.log('request header details', JSON.parse(localStorage.getItem('profile')))
        console.log('request header',req.headers.authorization)
        // console.log('req', req )
    }       
    return req;
});

const auth = '/api/auth';

export const signUp = (signUpData) => API.post(`${auth}/signup`, signUpData);
export const signIn = (signInData) => API.post(`${auth}/signin`, signInData); //, { withCredentials: true, credentials: 'include' }

export const getUser = (userId) => API.get(`${auth}/user/${userId}`) 


export const getAllProducts = () => API.get('/api/products');
export const getOneProduct = (productId) => API.get(`/api/products/${productId}`)
export const postPurchasedProducts = (productId) => API.post(`/api/products/${productId}`)

// export const postPurchasedProducts = (product) => API.post(`/api/`, product)
export const getPurchasedProducts = () => API.get('/api/product/purchased')   
export const postTotalAmount = (totalAmount) => API.post('/api/postTotalAmount', totalAmount)

export const postWithdrawalDetails = (withdrawalDetails) => API.post('/api/withdrawalRequest', withdrawalDetails)

export const getProfits = () => API.get('api/withdrawal/profit')

export const proceedToPayment = (details) => API.post('/api/paystack/accept', details)