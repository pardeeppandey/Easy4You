import React, { useState, useContext } from 'react';
import { WalletContext } from './WalletContext';
import Header from './Header';
import Footer from './Footer';
import Driverside from './Driverside';
import './Customerpay.css';

export default function Driverpay() {
  const [amount, setAmount] = useState('');
  const { dispatch, state } = useContext(WalletContext);

  const payment = () => {
    const amountToDeduct = parseFloat(amount);
    if (!isNaN(amountToDeduct) && amountToDeduct > 0) {
      if (amountToDeduct <= state.walletBalance) {
        dispatch({ type: 'DEDUCT_FROM_WALLET', amount: amountToDeduct });
        setAmount(''); // Clear the input field after deducting from wallet
        prompt("Enter OTP", '');
      } else {
        alert("Insufficient balance.");
      }
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div>
      <Header />
      <div className='customerpay'>
        <Driverside />
        <div style={{ height: "100%", width: '900px' }}>
          <div>
            <h2 className='m-3'>Payments Details</h2>
          </div>
          <div className='customerpay1 mb-3'>
            <div>
              <span className='span'>Name</span>
              <br />
              <input className="input1" type="text" name='name' placeholder="John Yal" />
            </div>
            <div>
              <span className='span'>Account Number</span>
              <br />
              <input className="input1" type="text" name='accountNumber' placeholder="1234-2546-8597" />
            </div>
            <div>
              <span className='span'>IFSC Code</span>
              <br />
              <input className="input1" type="text" name='ifscCode' placeholder="ICICI00075" />
            </div>
            <div>
              <span className='span'>Rupees</span>
              <br />
              <input className="input1" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} name='amount' placeholder="100" />
            </div>
            <div>
              <button className='button' onClick={payment}>Transfer Money</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
