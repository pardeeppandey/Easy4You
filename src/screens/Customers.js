import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Customers() {
  const [credentials, setcredentials] = useState({ name: '', email: '', password: '',mobilenumber: '',address:'' });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, mobilenumber: credentials.mobilenumber, address: credentials.address })
    });
    const json = await response.json();
    console.log(json);
    if (!(json.success)) {
      alert('Enter valid credentials');
    }
    if (json.success){
      navigate('/login');
    }
  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div><Header/></div>
      <div className='container w-50' style={{"height":"550px"}}>
        <h2 className='m-3'>Sign Up As Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' placeholder="Full Name" value={credentials.name} onChange={onchange} />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' placeholder="Email" value={credentials.email} onChange={onchange} />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' placeholder="Password" value={credentials.password} onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Mobile Number</label>
            <input type="text" className="form-control" name='mobilenumber' placeholder="987654321" value={credentials.mobilenumber} onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" name='address' placeholder="Your Location" value={credentials.address} onChange={onchange} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Sign Up</button>
          <Link to='/login' className='m-2 btn btn-danger'> Already a User</Link>
        </form>
      </div>
      <div><Footer/></div>
    </div>
  )
}
