import React, { useState, useContext } from 'react';
import { WalletContext } from './WalletContext';
import Customerside from '../components/Customerside';
import Header from './Header';
import Footer from './Footer';
import './Customerpay.css';

export default function Customerpay() {
  const [endLocation, setEndLocation] = useState('');
  const { dispatch } = useContext(WalletContext);

  const payment = () => {
    const amount = parseFloat(endLocation);
    if (!isNaN(amount) && amount > 0) {
      dispatch({ type: 'ADD_TO_WALLET', amount });
      setEndLocation(''); // Clear the input field after adding to wallet
      prompt("Enter OTP", '');
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div>
      <Header/>
      <div className='customerpay'>
        <Customerside />
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
              <span className='span'>Card Number</span>
              <br />
              <input className="input1" type="text" name='email' placeholder="1234-2546-8597" />
            </div>

            <div className='customerpay2'>
              <div>
                <span className='span'>Expiry</span>
                <br />
                <input className="customerinput" type="text" name='mobilenumber' placeholder="MM/YYYY" />
              </div>
              <div>
                <span className='span'>CVV/CVC</span>
                <br />
                <input className="customerinput " type="password" name='mobilenumber' placeholder="****" />
              </div>
            </div>

            <div>
              <span className='span'>Rupees</span>
              <br />
              <input className="input1" type="text" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} name='mobilenumber' placeholder="100" />
            </div>

            <div>
              <button className='button' onClick={payment}>Add To Wallet</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
