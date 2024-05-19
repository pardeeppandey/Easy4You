import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Customerside from '../components/Customerside';
import './Customerhis.css'
export default function Customerhis() {
  const [history, setHistory] = useState([]);

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

  return (
    <div>
      <Header />
      <div className='customerhis'>
        <Customerside />
        <div>
          <h2 className='m-3'>History</h2>
          <div className=' table-container m-3 mt-4 table-responsive  'style={{"width":"900px"}}>
            <table className='table table-hover'>
              <thead className='text-success fs-5 '>
                <tr>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Total Distance</th>
                  <th>Fare</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((itemArray, index) => (
                    itemArray.length > 0 ? (
                      itemArray.map((item, subIndex) => (
                        <tr key={`${index}-${subIndex}`}>
                          <td>{item.source}</td>
                          <td>{item.destination}</td>
                          <td>{parseInt(item.totalDistance)}</td>
                          <td>{parseInt(item.fare)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr key={index}>
                        <td colSpan="4">No data available</td>
                      </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
