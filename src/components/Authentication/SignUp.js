import * as api from '../../api'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormControl,  Stack, TextField } from '@mui/material';
import './signin.css'

const SignUp = () => {

  const initialLogin = { email:'', password:'', referralCode:''};

  const [signUpData, setsignUpData] = useState(initialLogin);
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();
  localStorage.clear();

  const handleSignUp = async () => {
    console.log('signUpData',signUpData);
    
    try {
        const { data } = await api.signUp(signUpData); //once action is dispatched, it gets a response "data"
        const jsonString = JSON.stringify(data);

      // Save the token to local storage
        localStorage.setItem('profile', jsonString);

        console.log('js', jsonString)
    
        navigate('/auth/login')
    
    } catch (error) {
      setErrorMessage(error.response.data.message)
      console.log(error.response.data.message)
      console.error('Error signing up:', error);
    }
  };

  

  const handleChange = (e) => {
      setsignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  return (
    <div className='signin'>
      <h2>Sign Up</h2>
      <p>{errorMessage}</p>
      <form onSubmit={handleSignUp}>
        <FormControl  onChange={handleChange} style={{ width: '80%' }}>

            <Stack spacing={4} className='stack'>
                <TextField label='Email' name='email' variant='outlined' onChange={handleChange} required/>
                <TextField label='Password' name='password' type='password' variant='outlined' onChange={handleChange} required/>
                <TextField label='Referral Code' name='referralCode' type='text' variant='outlined' onChange={handleChange}/>
            </Stack>

            <p className='account'>Don't have an account? <span><Link className='login-link' to="/auth/login">Login</Link></span></p>
        </FormControl>
      </form>
      <Button variant="outlined" color="error" onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
};

export default SignUp;
