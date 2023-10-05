import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ProductDetail from './components/ProductDetail/ProductDetail';
import PurchasedProducts from './components/PurchasedProducts/PurchasedProducts';
import Agreement from './components/Agreement/Agreement';
import Payment from './components/Payment/Payment';

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth/login" exact element={<SignIn />} />
          <Route path="/auth/signup" exact element={<SignUp />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path="/products/:id" exact element={<ProductDetail />} />
          <Route path='/dashboard/purchased' exact element={<PurchasedProducts />} />
          <Route path='/dashboard/agreement' exact element={<Agreement />} />
          <Route path='/payment' exact element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

