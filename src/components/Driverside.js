import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext'; // Adjust the path as needed
import { WalletContext } from '../components/WalletContext';
import login from '../images/login.jpg';

export default function Customerprofile() {
    const { user } = useContext(UserContext);
    const { state } = useContext(WalletContext);
    const location = useLocation();

    const activeStyle = {
        color: 'yellow',
        borderLeft: '4px solid white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingLeft: '12px'
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "220px", height: "90vh" }}>
            <Link to="/driverprofile/driverpro" className="d-flex align-items-center mb-3 text-white text-decoration-none">
                <img src={login} alt="" width="50" height="50" className="rounded-circle me-2" />
                <span className="fs-4 mx-3">{user?.name || 'Guest'}</span>
            </Link>
            <br />
            <span className="fs-6 mx-3">Earning: {parseInt(state.walletBalance)}</span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link
                        to="/driverprofile"
                        className="nav-link"
                        style={location.pathname === '/driverprofile' ? activeStyle : { color: 'white' }}
                    >
                        Get Ride
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/driverprofile/driverpro"
                        className="nav-link"
                        style={location.pathname === '/driverprofile/driverpro' ? activeStyle : { color: 'white' }}
                    >
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/driverprofile/driverpay"
                        className="nav-link"
                        style={location.pathname === '/driverprofile/driverpay' ? activeStyle : { color: 'white' }}
                    >
                        Payments
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/driverprofile/driverhis"
                        className="nav-link"
                        style={location.pathname === '/driverprofile/driverhis' ? activeStyle : { color: 'white' }}
                    >
                        History
                    </Link>
                </li>
            </ul>
        </div>
    );
}
