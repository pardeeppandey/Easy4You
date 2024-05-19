import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import login from '../images/login.jpg';

export default function Header() {

    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        localStorage.removeItem('usertype');
    }

    const authToken = localStorage.getItem('authtoken');
    const userType = localStorage.getItem('usertype');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="collapse navbar-collapse head" id="navbarSupportedContent">
                <NavLink className="nav-link fs-3 p-2 " to="/" style={{ fontWeight: "600", color: 'white' }}>Easy4You</NavLink>
                <div className="head0">
                    <NavLink className="navbar-brand fs-6" to="/" style={{ fontWeight: "500" }} activeClassName="active-link">Home</NavLink>
                    <NavLink className="navbar-brand fs-6" to="/Safety" style={{ fontWeight: "500" }} activeClassName="active-link">Safety</NavLink>
                    <NavLink className="navbar-brand fs-6" to="/Aboutus" style={{ fontWeight: "500" }} activeClassName="active-link">About Us</NavLink>
                    <NavLink className="navbar-brand fs-6" to="/Contactus" style={{ fontWeight: "500" }} activeClassName="active-link">Contact Us</NavLink>
                </div>
                {authToken ? (
                    <NavLink to={userType === 'driver' ? "/driverprofile" : "/customerprofile"} className="d-flex align-items-center text-white text-decoration-none mx-2">
                        <img src={login} alt="" width="50" height="50" className="rounded-circle me-2 mx-5" />
                    </NavLink>
                ) : ''}
                {!authToken ? (
                    <div>
                        <form className="head1">
                            <span className="nav-item">
                                <NavLink className="btn btn-dark my-2 my-sm-0 sign" to="/login">Login</NavLink>
                            </span>
                            <span className="form-inline my-2 my-lg-0">
                                <NavLink className="btn btn-dark my-2 my-sm-0 sign" to="/signup">Sign up</NavLink>
                            </span>
                        </form>
                    </div>
                ) : (
                    <span className="form-inline my-2 my-lg-0">
                        <NavLink className="btn btn-dark my-2 my-sm-0 sign" to='/' onClick={handleLogout}>Logout</NavLink>
                    </span>
                )}
            </div>
        </nav>
    );
}
