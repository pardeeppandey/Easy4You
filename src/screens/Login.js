import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../components/UserContext'; // Adjust the path as needed

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [usertype, setUsertype] = useState('user'); // Default to 'user'
  const { setUserDetails } = useContext(UserContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = usertype === 'user' ? 'loginuser' : 'logindriver';
    try {
      const response = await fetch(`http://localhost:5000/api/${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      if (!json.success) {
        alert('Enter valid credentials');
        return;
      }
      localStorage.setItem('authtoken', json.authtoken);
      localStorage.setItem('usertype', usertype);
      toast.success('Login Successfully');

      // Fetch user details
      const userResponse = await fetch(`http://localhost:5000/api/get${usertype}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': json.authtoken,
        },
      });
      if (!userResponse.ok) {
        throw new Error(`HTTP error! Status: ${userResponse.status}`);
      }
      const userData = await userResponse.json();
      setUserDetails(userData); // Update user details in context

      navigate(usertype === 'user' ? '/customerprofile' : '/driverprofile');
    } catch (error) {
      console.error('Failed to fetch', error);
      alert('Failed to fetch: ' + error.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onUsertypeChange = (e) => {
    setUsertype(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className='container w-50' style={{ height: '470px' }}>
        <h2 className='m-3'>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              placeholder='Email'
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              placeholder='Password'
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='usertype' className='form-label'>Login as</label>
            <select className='form-select' id='usertype' value={usertype} onChange={onUsertypeChange}>
              <option value='user'>Customer</option>
              <option value='driver'>Driver</option>
            </select>
          </div>
          <button type='submit' className='btn btn-success'>
            Log In
          </button>
          <Link to='/signup' className='m-2 btn btn-danger'>
            Register New user
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}
