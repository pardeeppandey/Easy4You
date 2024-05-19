import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from '../components/Header';
import Customerside from '../components/Customerside';
import Footer from '../components/Footer';
import { WalletContext } from '../components/WalletContext';
import './Customerprofile.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import './Price.css';

export default function Customerprofile() {
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [map, setMap] = useState(null);
    const [control, setControl] = useState(null);
    const [routeInfo, setRouteInfo] = useState({
        source: '',
        destination: '',
        totalDistance: 0,
        fare: 0,
    });

    const { state, dispatch } = useContext(WalletContext);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!map) return; // Ensure map is initialized

        L.Control.Geocoder.nominatim().geocode(startLocation, function (results) {
            var startLatLng = results[0].center;
            var startMarker = L.marker([startLatLng.lat, startLatLng.lng]).addTo(map);

            L.Control.Geocoder.nominatim().geocode(endLocation, function (results) {
                var endLatLng = results[0].center;
                var endMarker = L.marker([endLatLng.lat, endLatLng.lng]).addTo(map);

                control.setWaypoints([
                    L.latLng(startLatLng.lat, startLatLng.lng),
                    L.latLng(endLatLng.lat, endLatLng.lng)
                ]);

                // Fit map to show the route and markers
                var bounds = L.latLngBounds([startLatLng, endLatLng]);
                map.fitBounds(bounds);

                // Get route summary and display it
                control.on('routesfound', function (e) {
                    var routes = e.routes;
                    var summary = routes[0].summary;
                    const totalDistance = (summary.totalDistance) / 1000;
                    const fare = totalDistance * 9;

                    setRouteInfo({
                        source: startLocation,
                        destination: endLocation,
                        totalDistance: totalDistance,
                        fare: fare,
                    });

                    // alert("Distance: " + summary.totalDistance + " meters");
                });
            });
        });
    };

    const handleHistory = async () => {
        const response = await fetch('http://localhost:5000/api/userhistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ source: routeInfo.source, destination: routeInfo.destination, totalDistance: routeInfo.totalDistance, fare: routeInfo.fare })
        });
        const json = await response.json();
        console.log(json);
        if (!(json.success)) {
            alert('Fetching History not working');
        }
    };

    const handleBookRide = async (e) => {
        e.preventDefault();
        if (state.walletBalance >= routeInfo.fare) {
            dispatch({ type: 'DEDUCT_FROM_WALLET', amount: routeInfo.fare });
            await handleHistory();
        } else {
            alert('Insufficient balance in wallet');
        }
    };

    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const mapInstance = L.map(mapRef.current).setView([0, 0], 2);
        setMap(mapInstance);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 15,
        }).addTo(mapInstance);

        const routingControl = L.Routing.control({
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim()
        }).addTo(mapInstance);

        setControl(routingControl);

        // Clean up function to remove map instance when component unmounts
        return () => {
            mapInstance.remove();
            setMap(null);
            setControl(null);
        };
    }, []);

    return (
        <div>
            <Header />
            <div className='customerprofile'>
                <Customerside />
                <div className=''>
                    <h2 className='m-3'>Book Ride</h2>
                    <div className='customerprofile1 '>
                        <div className='customerprofile2'>
                            <form >
                                <div className="customerprofile3">
                                    <div className="">
                                        <input className='input' placeholder="Origin" type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required />
                                    </div>
                                    <div className="">
                                        <input className='input' type="text" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} required placeholder="Destination" />
                                    </div>
                                </div>
                            </form>
                            <div id="map" ref={mapRef} style={{ height: '400px', width: '790px', borderRadius: "20px" }} className='m-4'></div>
                        </div>
                        <div className=''>
                            <div>
                                <h3>Route Information:</h3>
                                <p>Source: {routeInfo.source}</p>
                                <p>Destination: {routeInfo.destination}</p>
                                <p>Total Distance: {parseFloat(routeInfo.totalDistance)} Kms</p>
                                <br/>
                                <p><h4>Easy4You </h4>Fare: {parseInt(routeInfo.fare)} Fixed</p>
                                <div className='customerprofile4'>
                                    <button className='btn btn-dark my-2 my-sm-0 sign ' onClick={handleFormSubmit}>See Price</button>                                
                                    <button className='btn btn-dark my-2 my-sm-0 sign  ' onClick={handleBookRide} type='submit'>Book Ride</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
