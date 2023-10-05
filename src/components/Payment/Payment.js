import React, { useState } from 'react'
import * as api from '../../api'
import { Button, FormControl, Stack, TextField } from '@mui/material';


const Payment = () => {
    const initialDetails = { email:'', amount:''};

    // const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
  
    const [details, setDetails] = useState(initialDetails);
  
    const handleProceed = async () => {
      console.log('details',details);
      
      try {
          const { data } = await api.proceedToPayment(details); //once action is dispatched, it gets a response "data"
          console.log('paystackdata', data)
  
  
        // Save the token to local storage
      
        //   navigate('/dashboard')
      } catch (error) {
        setErrorMessage(error.response.data.message)
        console.error('Error signing in:', error);
      }
    };
  
    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }
  
    return (
      <div className='signin'>
        <h3>Proceed To Payment</h3>
  
        <h3>{errorMessage}</h3>
        <form onSubmit={handleProceed}>
          <FormControl  onChange={handleChange} style={{ width: '80%' }}>
  
              <Stack spacing={4} className='stack'>
                  <TextField label='Enter Email Address' name='email' type='email' variant='outlined' onChange={handleChange} required/>
                  <TextField 
                    label='Enter amount to be paid' name='amount' type='number'  variant='outlined' onChange={handleChange} required 
                    fullWidth
                    color='success'
                  />
              </Stack>
          </FormControl>
        </form>
  
        <Button variant="outlined" color="error" onClick={handleProceed}>Procced to payment</Button>
      </div>
    );
}

export default Payment