
import React, { useContext } from 'react';
import { UserContext } from './UserContext'; 
import Header from './Header'
import Footer from './Footer'
import Driverside from './Driverside'
import './Customerpro.css';

export default function Driverpro() {
    const { user } = useContext(UserContext);
  return (
    <div>
        <Header/>
        <div className='customerpro'>
                <Driverside />
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
                                        <th>Addhar Number</th>
                                        <td>{user.addhar}</td>
                                    </tr>
                                    <tr>
                                        <th>Lisence</th>
                                        <td>{user.lisence}</td>
                                    </tr>
                                    <tr>
                                        <th>Vehicle</th>
                                        <td>{user.vehicle}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            </div>
        <Footer/>
    </div>
  )
}
