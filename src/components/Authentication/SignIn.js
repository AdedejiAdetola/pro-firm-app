import * as api from '../../api'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormControl,  Stack, TextField } from '@mui/material';
import './signin.css'

const SignIn = () => {
  const initialLogin = { email:'', password:''};

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')

  const [signInData, setsignInData] = useState(initialLogin);
  localStorage.clear();

  const handleSignIn = async () => {
    // console.log('signInData',signInData);
    
    try {
        const { data } = await api.signIn(signInData); //once action is dispatched, it gets a response "data"
        // console.log('data', data)

        const jsonString = JSON.stringify(data);

      // Save the token to local storage
        localStorage.setItem('profile', jsonString);
    
        navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.response.data.message)
      console.error('Error signing in:', error);
    }
  };

  const handleChange = (e) => {
    setsignInData({ ...signInData, [e.target.name]: e.target.value });
  }

  return (
    <div className='signin'>
      <h2>Sign In</h2>

      <h3>{errorMessage}</h3>
      <form onSubmit={handleSignIn}>
        <FormControl  onChange={handleChange} style={{ width: '80%' }}>

            <Stack spacing={4} className='stack'>
                <TextField label='Email' name='email' variant='outlined' onChange={handleChange} required/>
                <TextField 
                  label='Password' name='password' type='password'  variant='outlined' onChange={handleChange} required 
                  fullWidth
                  color='success'
                />
            </Stack>

            <p className='account'>Don't have an account? <span><Link className='login-link' to="/auth/signup">Signup</Link></span></p>
        </FormControl>
      </form>

      <Button variant="outlined" color="error" onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default SignIn;
