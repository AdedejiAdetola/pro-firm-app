import React, { useState, useEffect } from 'react';

import * as api from '../api'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import video from '../assets/video.mp4'
import Product from './Product/ProductComponent';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import './dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [open, setOpen] = useState(true);
  // console.log('useer',user.data._id)

  const userId = user ? user?.user?._id : user?.data?._id 
  const navigate = useNavigate();


  // console.log('products', products.products)


  useEffect(() => {
    const fetchProducts = async () => {
      try {

        // const response2 =  await api.getUser(userId)
        

        const response = await api.getAllProducts();
        setProducts(response.data.data);

        
      } catch (error) {
        localStorage.clear()
        navigate('/')
        console.error('Error fetching products:', error);
      }
    };
    
    // Fetch products when the component mounts
    fetchProducts();
  }, [navigate]);

  

  
 const refCode = user.user.referralCode

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='dashboard'>
      <Navigation />

      <video controls width="600" height="400">
        <source src={video} controls loop type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <h2> Your referral code is {refCode}</h2>
      <div className='product'>
        <h1>Products</h1>

        <ul>
        {products.map(product => (
          <li key={product.productId}>
            <Product product={product}/>
          </li>
        ))}
      </ul>
        
      </div>
      

      <Dialog open={open} onClose={handleClose}>

        <Box pr={10}>

            <DialogTitle>
                <Typography variant="body1" fontWeight="bold" align='center' p={2}>Create Sustainable Future with PRO-FIRM</Typography>
            </DialogTitle>

            <DialogContent>
            <DialogContentText>
                <Typography variant="body1" fontWeight="bold" mb={3}>Welcome to PRO-FIRM!</Typography>
                <Typography variant="body1" mb={1}>The Journey of a thousand miles begins with a step</Typography>

                <Box mb={3}>
                    <Typography variant="body1" mb={1}> 1. Product daily income</Typography>
                    <Typography variant="body1" mb={1}> 2. Invitation rewards</Typography>
                    <Typography variant="body1" mb={1}> 3. Team Commission</Typography>
                    <Typography variant="body1"> 4. Monthly salary</Typography>
                </Box>

                <Typography variant="body1">Invite friends to join and get invitation rewards</Typography>
            </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} fullWidth variant="outlined" color="error">Close</Button>
            </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default Dashboard;
