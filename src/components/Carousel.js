import React from 'react'
import './Carousel.css'
import photo1 from '../images/photo1.jpeg'
import photo4 from '../images/photo4.jpeg'
import photo7 from '../images/photo7.png'
import { Link } from 'react-router-dom'

export default function Carousel() {
    const isLoggedIn = localStorage.getItem('authtoken');
    const userType = localStorage.getItem('usertype');

    return (
        <div>
            <div className=" slider1">
                <div className="second">
                    <h1 className="">Go anywhere with Easy4You</h1>
                    <h6>Request a ride, hop in, and go</h6>
                    {/* <input className="input" placeholder="Origin" type="text" id="startLocation" name="startLocation" required />
                    <input className="input" placeholder="Destination" type="text" id="endLocation" name="endLocation" required /> */}
                    <h6>Easy4You allows users to compare the fares of different transportation options for a given route.</h6>
                    <Link to={isLoggedIn ? (userType === 'user' ? "/customerprofile" : "/price") : "/price"} className="btn btn-dark my-2 my-sm-0 sign">See Prices</Link>
                </div>
                <div className="carousel-item active">
                    <img className="d-block w-100" src={photo1} alt="First slide" />
                </div>
            </div>
            <div className="slider2">
                <div className=" active" >
                    <img className="d-block w-100" src={photo4} alt="Second slide" />
                </div>
                <div className="second">
                    <h1 className="">Drive when you want, make what you need</h1>
                    <h6>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Easy4You.</h6>
                    <Link to={isLoggedIn ? (userType === 'driver' ? "/driverprofile" : "/signup/driver") : "/signup/driver"} className="btn btn-dark my-2 my-sm-0 sign">Get started</Link>

                </div>
            </div>
            <div className="slider1 ">
                <div className="second">
                    <h1 className="">Make money by renting out your car and bike</h1>
                    <h6>Connect with thousands of drivers and earn more per week with Easy4You’s free fleet management tools.</h6>

                    <Link to={isLoggedIn ? (userType === 'driver' ? "/driverprofile" : "/signup/driver") : "/signup/driver"} className="btn btn-dark my-2 my-sm-0 sign">Get started</Link>
                </div>
                <div className="carousel-item active">
                    <img className="d-block w-100" src={photo7} alt="Third slide" />
                </div>
            </div>
        </div>
    )
}
