import React, { useState, useEffect } from 'react';
import * as api from '../../api';
import { useNavigate } from 'react-router-dom';
import OnePurchasedProduct from './OnePurchasedProduct/OnePurchasedProduct';
import Navigation from '../Navigation/Navigation';
import './purchasedproducts.css'

const PurchasedProducts = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const userId = user.user._id
  const [getPurchasedProducts, setGetPurchasedProducts] = useState([])
  const [profit, setProfit] = useState(0)


  const fetchPurchasedProducts = async () => {
    try {
      const response = await api.getPurchasedProducts();
      setPurchasedProducts(response.data);

      const profits = await api.getProfits();
      console.log('profit', profits.data.data)
      setProfit(profits.data.data)

      const res3 = api.getUser(userId)
        res3.then(data => {
          console.log('data',data.data.data)
          setGetPurchasedProducts(data.data.data)
        })
    } catch (error) {
      localStorage.clear();
      navigate('/');
      console.error('Error fetching purchased products:', error);
    }
  };
  useEffect(() => {
    fetchPurchasedProducts();
  }, [navigate]);

  const handleWithdraw = () => {
    // After withdrawal, fetch updated data
    fetchPurchasedProducts();
  };
  
  

  const calculateAccumulatedIncome = (product) => {
     // You'll need to get the actual purchase date from your API response
    // console.log('prod', product._id)

    const purchasedProduct = getPurchasedProducts.purchasedDetails?.find(
      (purchasedProduct) => purchasedProduct._id === product._id
    );

    // console.log('ppdct', purchasedProduct);

    const currentDate = new Date();
    const purchaseDate = purchasedProduct ? new Date(purchasedProduct.date) : new Date()

    // console.log('pd', purchaseDate.getTime())




    const timeDiff = currentDate.getTime() - purchaseDate.getTime();
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysPassed >= product.productCycle) {
      return product.productTotalIncome;
    } else {
      return daysPassed * product.productDailyIncome;
    }
  };

  

  return (
    <div>
      <Navigation />

      <div className='purchasedProducts'>
        <h2>Purchased Products</h2>

        <h3>Accumulated Commission: {profit}</h3>
        <ul>
          {purchasedProducts.data?.map((product) => {
            const accumulatedIncome = calculateAccumulatedIncome(product);
            const daysRemaining = Math.max(0, product.productCycle - accumulatedIncome / product.productDailyIncome);

            const purchasedProduct = getPurchasedProducts.purchasedDetails?.find(
              (purchasedProduct) => purchasedProduct._id === product._id
            );

            const purchaseDate = purchasedProduct ? new Date(purchasedProduct.date) : new Date()
            const year = purchaseDate.getFullYear();
            const month = purchaseDate.getMonth() + 1; // Months are zero-based, so we add 1
            const day = purchaseDate.getDate();
            const hours = purchaseDate.getHours();
            const minutes = purchaseDate.getMinutes();
            const seconds = purchaseDate.getSeconds();

            // Create a formatted date string
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // console.log(`Formatted Date: ${formattedDate}`);
            // console.log(`Formatted Time: ${formattedTime}`);
            const getDate = `${formattedDate} ${formattedTime}`

            return (
              
              <li key={product.productId}>
                <OnePurchasedProduct
                  purchasedProduct={product}
                  accumulatedIncome={accumulatedIncome}
                  daysRemaining={daysRemaining}
                  onWithdraw={handleWithdraw}
                  date = {getDate}
                />
              </li>
            );
          })}
        </ul>
      </div>

      
    </div>
  );
};

export default PurchasedProducts;

