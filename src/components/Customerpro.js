import React, { useContext } from 'react';
import { UserContext } from './UserContext'; // Adjust the path as needed
import Header from '../components/Header';
import Footer from '../components/Footer';
import Customerside from '../components/Customerside';
import './Customerpro.css'; // Import your existing CSS file

export default function Customerpro() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <Header />
            <div className='customerpro'>
                <Customerside />
                <div className='profile-details'>
                    <h2 className='m-3'>Profile</h2>
                    {user ? (
                        <div className='m-5 profile-container'style={{"height":"250px","width":"600px"}}>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile Number</th>
                                        <td>{user.mobilenumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>{user.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
