import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Driverside from './Driverside';
import { WalletContext } from './WalletContext';
import './Driverprofile.css';

export default function Driverprofile() {
    const [history, setHistory] = useState([]);
    const { dispatch } = useContext(WalletContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/displayuserhistory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setHistory(data);
            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };
        fetchData();
    }, []);

    const handleAccept = async (item, itemArrayIndex, itemIndex) => {
        const { source, destination, totalDistance, fare } = item;

        try {
            const res = await fetch('http://localhost:5000/api/driverhistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ source, destination, totalDistance, fare })
            });

            if (res.ok) {
                const result = await res.json();
                if (result.success) {
                    // Update the wallet balance
                    dispatch({ type: 'ADD_TO_WALLET', amount: parseInt(fare) });

                    // Remove the accepted ride from the state
                    setHistory(prevHistory => {
                        const updatedHistory = [...prevHistory];
                        updatedHistory[itemArrayIndex] = updatedHistory[itemArrayIndex].filter((_, i) => i !== itemIndex);
                        return updatedHistory;
                    });
                } else {
                    console.error('Error saving accepted ride to backend');
                }
            } else {
                console.error('Error saving accepted ride to backend');
            }
        } catch (error) {
            console.error('Error saving accepted ride to backend:', error);
        }
    };


    return (
        <div>
            <Header />
            <div className='driverprofile1'>
                <Driverside />
                <div className="m-3">
                    <h2>Ride Requests</h2>
                    <div className='driverprofile m-4' style={{ width: "1300px" }}>
                        {history.length > 0 ? (
                            history.map((itemArray, itemArrayIndex) => (
                                itemArray.length > 0 ? (
                                    itemArray.map((item, itemIndex) => (
                                        <div key={`${itemArrayIndex}-${itemIndex}`} className="ride-request">
                                            <p><strong>Source:</strong> {item.source}</p>
                                            <p><strong>Destination:</strong> {item.destination}</p>
                                            <p><strong>Total Distance:</strong> {parseInt(item.totalDistance)} km</p>
                                            <p><strong>Earning:</strong> ₹{parseInt(item.fare)}</p>
                                            <button
                                                className="accept-btn"
                                                onClick={() => handleAccept(item, itemArrayIndex, itemIndex)}
                                            >
                                                Accept
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div key={itemArrayIndex} className="ride-request no-data">
                                        <p>No data available</p>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className="ride-request no-data">
                                <p>No data available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
