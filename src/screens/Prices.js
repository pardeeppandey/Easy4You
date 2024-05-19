import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Price.css'

const MapComponent = () => {

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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!map) return; // Ensure map is initialized

    const startIcon = L.icon({
      iconUrl: 'path/to/start-icon.png', // Replace with the path to your start icon image
      iconSize: [25, 41], // Size of the icon
      iconAnchor: [12, 41], // Anchor point of the icon (left, top)
      popupAnchor: [1, -34], // Anchor point of the popup (left, top)
      shadowSize: [41, 41], // Size of the shadow
    });

    const endIcon = L.icon({
      iconUrl: 'path/to/end-icon.png', // Replace with the path to your end icon image
      iconSize: [25, 41], // Size of the icon
      iconAnchor: [12, 41], // Anchor point of the icon (left, top)
      popupAnchor: [1, -34], // Anchor point of the popup (left, top)
      shadowSize: [41, 41], // Size of the shadow
    });

    L.Control.Geocoder.nominatim().geocode(startLocation, function (results) {
      var startLatLng = results[0].center;
      L.marker([startLatLng.lat, startLatLng.lng], { icon: startIcon }).addTo(map);

      L.Control.Geocoder.nominatim().geocode(endLocation, function (results) {
        var endLatLng = results[0].center;
        L.marker([endLatLng.lat, endLatLng.lng], { icon: endIcon }).addTo(map);

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
    <div >
      <div><Header /></div>
      <div className='pricediv m-5'>
        <div className='pricediv1'>
          <form onSubmit={handleFormSubmit}>
            <div className="pricediv2">
              <div className="">
                <input className='input' placeholder="Origin" type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required />
              </div>
              <div className="">
                <input className='input' type="text" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} required placeholder="Destination" />
              </div>
              <div className="">
                <button className='btn btn-dark my-2 my-sm-0 sign ' type="submit">See Prices</button>
              </div>
            </div>
          </form>
          <div id="map" ref={mapRef} style={{ height: '400px', width: '900px', borderRadius: "20px" }} className='m-4'></div>
        </div>
        <div className=''>
          <div>
          <h3>Route Information:</h3>
            <p>Source: {routeInfo.source}</p>
            <p>Destination: {routeInfo.destination}</p>
            <p>Total Distance: {parseFloat(routeInfo.totalDistance)} Kms</p>
            <p><h4>Uber</h4>Fare: {parseInt((routeInfo.fare)/9*12)}</p>
            <p><h4>Ola</h4>Fare: {parseInt((routeInfo.fare)/9*11)}</p>
            <p><h4>Rapiodo</h4>Fare: {parseInt((routeInfo.fare)/9*10)}</p>
            <p><h4>Easy4You (Our Price)</h4>Fare: {parseInt(routeInfo.fare)} Fixed</p>
          </div>
        </div>
      </div>
      <div><Footer /></div>
    </div>
  );
};

export default MapComponent;
