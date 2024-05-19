import React from 'react'
import Header from './Header'
import Footer from './Footer'
import photo10 from '../images/photo10.png'
import './Aboutus.css'
export default function Aboutus() {
  return (
    <div>
      <div><Header /></div>
      <div className='about'>
        <div><img className="img" src={photo10} alt="Card image cap" style={{ "width": "500px" }} /></div>
        <div className='about1'>
          <div>
            <h1>India’s Beloved</h1>
            <h1>Bike Taxi Service</h1>
          </div>
          <div>
            <h5>We are not an option, we are a choice</h5>
            <h6>We're #1 choice of 10 Million people because we're the solution of India's intra-city commuting problems. With assured safety, we also provide economically priced rides.</h6>
          </div>
          <div>
            <h5>What makes us different?</h5>
            <h6>Our bike taxis can dodge the traffic during peak hours and get you to the destination in a jiffy! So when you think travel, think Easy4You.</h6>
          </div>
          <div>
            <h4>Champions of our success story</h4>
            <h6>Easy4You has come a long way ever since its inception in 2024. With a lot of hardwork and perseverance we have made a place for ourselves in the market. As a brand and as a service, it is our constant endeavour to redefine ourselves.</h6>
          </div>
        </div>
        <div></div>
      </div>
      <div><Footer /></div>
    </div>
  )
}
