import React from 'react'
import Header from './Header'
import Footer from './Footer'
import photo12 from '../images/photo12.png'
import './Safety.css'
export default function Safety() {
  return (
    <div>
      <div><Header /></div>
      <div className='safe'>
        <div>  <img className="img" src={photo12} alt="Card image cap" /></div>
        <div className='safe1'>
          <div>
            <h1>Safety first</h1>
            <h6>And safety for everyone. Easy4You prioritizes safety from both seats – passenger and driver – while working diligently on new safety features. We are also encouraging everyone to adhere to safety guidelines</h6>
          </div>
          <div>
            <h1>Safety for all</h1>
            <h6>At Easy4You, The well-being of our customers is above everything else. We are constantly in pursuit of enhancing our safety measures to ensure every Easy4You ride is a peasant and comfortable experience</h6>
          </div>
        </div>
      </div>
      <div><Footer /></div>
    </div>
  )
}
