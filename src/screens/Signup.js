import React from 'react'
import './Signup.css'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import photo13 from '../images/photo13.png'


export default function Signup() {
    return (
        <>
            <div><Header /></div>
            <div className="card_0">
                <img className="img" src={photo13} alt="Card image cap" />
                <div className="card_1 ">
                    <Link className="nav-link" to="/signup/customer">
                        <div className="in">
                            Customer
                            <p className="in_in">Book Bike, Cabs, Auto </p>
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </Link>
                </div>
                <div className="card_1 ">
                    <Link className="nav-link" to="/signup/driver">
                        <div className="in">
                            Driver
                            <p className="in_in">Register as a driver, Take rides </p>
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </Link>
                </div>
            </div >
            <div><Footer /></div>
        </>
    )
}
