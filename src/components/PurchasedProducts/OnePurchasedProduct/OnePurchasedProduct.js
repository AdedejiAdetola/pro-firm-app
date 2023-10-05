import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import * as api from '../../../api';
import './one-purchased.css';

const OnePurchasedProduct = ({ date, purchasedProduct, accumulatedIncome, daysRemaining, onWithdraw  }) => {

    
    const [currentAccumulatedIncome, setCurrentAccumulatedIncome] = useState(accumulatedIncome);
    const [withdrawalDialogOpen, setWithdrawalDialogOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0)

    console.log('pin', purchasedProduct.productTotalIncome)

    

    const [formValues, setFormValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
      accountNumber: "",
      accountName: ""
    });

    useEffect(() => {
        setCurrentAccumulatedIncome(accumulatedIncome);
    }, [accumulatedIncome]);

    const isFormEmpty = Object.values(formValues).some(value => value === "");

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormValues(prevValues => ({
          ...prevValues,
          [name]: value
      }));
    };

    const handleWithdrawalClick = async () => {
      
    //   try {
    //     const response = await api.postTotalAmount({ purchasedProduct, totalAmount})
    //     console.log('res', response)
        
    //     onWithdraw();
    //   } catch (error) {
    //     console.log(error)
    //   }

      setWithdrawalDialogOpen(true);
  };

  const handleCloseWithdrawalDialog = () => {
      setWithdrawalDialogOpen(false);
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    
    const newTotalAmount = purchasedProduct.productTotalIncome - parseFloat(formValues.amount);
    console.log('pit',purchasedProduct.productTotalIncome)
    console.log('new', newTotalAmount)
  
    // Update the totalAmount in the API
    try {
      const response = await api.postTotalAmount({ purchasedProduct, totalAmount: newTotalAmount })
      console.log('res2', response);
    } catch (error) {
      console.log(error);
    }
  
    // Update the state with the new totalAmount
    setTotalAmount(newTotalAmount);
    onWithdraw();
    handleCloseWithdrawalDialog();
  };

//   console.log('t-inc', purchasedProduct.totalIncome)

  
    return ( 
        <div className="one-purchased">
            <p><span>Product Name: </span> <span>{purchasedProduct.productTitle}</span></p>
            <p><span>Product Initial Price: </span> <span>{purchasedProduct.productPrice.toFixed(2)} NGN</span></p>
            <p><span>Purchase Date: </span> <span>{date}</span></p>
            <p><span>Accumulated Income: </span> <span>{accumulatedIncome}</span></p>
            <p><span>Days Remaining: </span> <span>{daysRemaining}</span> </p>

            {/* <p>Product Cycle: {purchasedProduct.productCycle}</p> */}
            {/* <p>Product Daily Income: {purchasedProduct.productDailyIncome}</p> */}
            {/* <p>Product Total Income: {purchasedProduct.productTotalIncome}</p> */}
            {/* if days remaining is 0 show withdraw button elso disable */}
            {/* <p>Total Income: {purchasedProduct.totalIncome}</p> */}

            {daysRemaining === 0 ? (
                <div>
                    <p><span>Total Income:</span> <span>{purchasedProduct.productTotalIncome}</span></p>
                    <p>Congratulations! Expect your returns to be sent within 72 hours</p>
                </div>
            ) : <p></p>}

            


            {/* Disable withdraw button if daysRemaining is not 0 */}
            {/* {daysRemaining !== 0 ? (
                <div className="button">
                <Button variant="outlined" color="error" disabled className="custom-link">Withdraw</Button></div>
            ) : (

              <Button variant="outlined" color="error" onClick={handleWithdrawalClick} className="custom-link">Withdraw</Button>
            )} */}

            {/* <Button variant="outlined" color="error" onClick={handleWithdrawalClick}>Withdraw</Button> */}


            {/* <Dialog open={withdrawalDialogOpen} onClose={handleCloseWithdrawalDialog}>
              <DialogTitle>Withdrawal Form</DialogTitle>

              <DialogContent>
                  <form onSubmit={handleWithdrawalSubmit}>
                      <TextField 
                          label="First Name" 
                          type="text" 
                          required 
                          fullWidth 
                          style={{ marginTop: '1rem', marginBottom: '1rem' }} 
                          name='firstName'
                          value={formValues.lastName}
                          onChange={handleInputChange}
                      />
                      <TextField 
                          label="Last Name" 
                          type="text" 
                          required 
                          fullWidth 
                          style={{ marginTop: '1rem', marginBottom: '1rem' }} 
                          name="lastName"
                          value={formValues.lastName}
                          onChange={handleInputChange}
                      />
                      <TextField 
                          label="e-mail Address" 
                          type="text" 
                          required 
                          fullWidth 
                          style={{ marginTop: '1rem', marginBottom: '1rem' }}
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                      />
                      <TextField 
                          label="Amount" 
                          type="number" 
                          required 
                          fullWidth 
                          style={{ marginTop: '1rem', marginBottom: '1rem' }}
                          name="amount"
                          value={formValues.amount}
                          onChange={handleInputChange}
                      />
                      <TextField 
                          label="Account Number"  
                          type="number" 
                          required 
                          fullWidth 
                          style={{ marginTop: '1rem', marginBottom: '1rem' }}
                          name="accountNumber"
                          value={formValues.accountNumber}
                          onChange={handleInputChange}
                      />
                      <TextField 
                          label="Account Name" 
                          type="text" 
                          required 
                          fullWidth
                          style={{ marginTop: '1rem', marginBottom: '1rem' }}
                          name="accountName"
                          value={formValues.accountName}
                          onChange={handleInputChange}
                      />
                  </form>

                  <p>Withdrawal time is between 24-72 hours, 5% handling fee will be deducted for each withdrawal, and withdrawal can only be made once a day.</p>
                  <p>As long as you have applied for a withdrawal, you will receive your money</p>
                  <p>All transactions of our company are carried out under the guarantee of the Nigeria Group of Forex traders and banks, and your funds are very safe!</p>
              </DialogContent>

              <DialogActions>
                  <Button onClick={handleCloseWithdrawalDialog}>Cancel</Button>
                  <Button onClick={handleWithdrawalSubmit} disabled={isFormEmpty || (formValues.amount > purchasedProduct.productTotalIncome) || (formValues.amount <= 0)} color="error">Withdraw</Button>
              </DialogActions>
            </Dialog> */}
        </div>
     );
}
 
export default OnePurchasedProduct;