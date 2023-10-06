import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as api from '../../api'
import { Button } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import './productdetail.css'

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [getPurchasedProducts, setGetPurchasedProducts] = useState([])
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const userId = user.user._id



  useEffect(() => {

    const fetchProduct = async (productId) => {
      try {
        const response = await api.getOneProduct(productId);
        // console.log('response', response.data.data)
        setProduct(response.data.data);

        // const purchasedResponse = await api.getPurchasedProducts();
        // console.log('pr', purchasedResponse)
        // setGetPurchasedProducts(purchasedResponse.data)

        const response2 =  await api.getPurchasedProducts()
        // setGetPurchasedProducts(response2.data.data.purchasedProducts)
        console.log('res2', response2)
        // console.log('Purchased response',)

        const res3 = api.getUser(userId)
        res3.then(data => {
          console.log('data',data.data.data.purchasedDetails)
          setGetPurchasedProducts(data.data.data)
        })
      } catch (error) {
        localStorage.clear()
        navigate('/')
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct(id);
  }, [id, userId, navigate]);
  

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToPurchased = async () => {
    console.log('purchased', product)

    

    try {
      const now = new Date();
      const response = await api.postPurchasedProducts(product._id);

      console.log('response', response)

      // console.log('responseX', response)
      navigate('/dashboard/purchased')
      // Show a success message or update state
    } catch (error) {
      console.error('Error adding product to purchased:', error);
      // Show an error message
    }
  }


  const handlePayment = async () => {
    //do something
  }

  
  //get user purchased products detail, check if they meet requirements

  // console.log('getPurchasedProducts', getPurchasedProducts.purchasedDetails)
  // console.log('product', product.productId)

  // Find the purchased product in the user's data
  const purchasedProduct = getPurchasedProducts.purchasedDetails?.find(
    (purchasedProduct) => purchasedProduct._id === product._id
  );

  // Get the purchase limit from the purchased product
  const purchaseLimit = purchasedProduct ? purchasedProduct.limit : product.purchaseLimit;

  // console.log('prod', purchasedProduct)
  // console.log('pl', purchaseLimit)
   
  // console.log('puc', purchasedProduct)
  // Get the number of referrals from the purchased product
  const numberOfReferrals = getPurchasedProducts ? getPurchasedProducts.referralCount : product.referrals

   // Check if userDetails meets requirements (example condition)
   const meetsRequirements = (numberOfReferrals === product.referrals) || (numberOfReferrals > product.referrals);

   
   // Check if the purchase limit is exhausted
   const exhaustedPurchaseLimit = purchaseLimit === 0;

  return (
    <div>
      <Navigation />

      <div className='detailContainer'>
        <h2>Product Detail</h2>
        <h3>{product.productTitle}</h3>
        <p>Price: {product.productPrice.toFixed(2)} NGN</p>
        <p>Cycle: {product.productCycle} days</p>
        <p>Daily Income: {product.productDailyIncome.toFixed(2)} NGN</p>
        <p>Total Income: {product.productTotalIncome.toFixed(2)} NGN</p>
        <p>Purchase Limit: {product.purchaseLimit}</p>
        <p>Required Number of Referrals: {product.referrals}</p>


        <h2>Product Information</h2>
        <p>{product.productInfo1}</p>
        <p>{product.productInfo2}</p>
        <p>{product.productInfo3}</p>

        <h3>To Purchase this product</h3>

        <ol>
          <li>
            <p>Transfer <strong>{product.productPrice.toFixed(2)}</strong> to the account details below</p>
            <p>Account Name: Adetola Adedeji</p>
            <p>Account Number: 0285566375</p>
            <p>Bank Name: GT Bank</p>
          </li>

          <li>
            <p>After Transfer, Send a screenshot as proof of payment to adetolaadedeji0@gmail.com</p>

            <p>Also include your email address and phone number you can be contacted on. Include your account details for you to receive your profit after the {product.productCycle} day cycle</p>
          </li>

          <li>
            <p>Once payment has been confirmed, a message will be sent to your email address and phone number indicating that you can proceed to purchase the product</p>
          </li>

          <li>
            <p>Click on the "purchase product" button, ONLY AFETR PAYMENT HAS BEEN CONFIRMED!</p>

            <p>Disclaimer: Clicking the product before receiving confirmation means you won't receive your profit on the purchased product</p>
          </li>

          <li>
            <p>Note: Obey the purchase limit strictly, do not try to purchase a product the third time if the limit is 2 else after your transfer of money and confirmation from our end, you wont be able to access the "purchase product" button which means you can purchase the product.</p>
          </li>

          <li>After {product.productCycle} days. Your profit will be transferred to your account</li>
        </ol>


        <Button onClick={handleAddToPurchased} disabled={!meetsRequirements || exhaustedPurchaseLimit} variant="outlined" color="error"><Link>Purchase Product</Link></Button>

        <h3>{!meetsRequirements ? `You can't purchase this product. You still have ${product.referrals - numberOfReferrals} referrals to complete` : ''}</h3>

        <p>Available Purchase Left: {purchaseLimit}</p>


        <h3>{exhaustedPurchaseLimit ? "You can not purchase this product again" :  ''}</h3>
      </div>
      


    </div>
  );
};

export default ProductDetail;