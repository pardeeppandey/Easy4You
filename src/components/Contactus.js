import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './Contactus.css'

export default function Contactus() {
  const [credentials, setcredentials] = useState({ name: '', email: '', password: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/usercomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, mobilenumber: credentials.mobilenumber, comment: credentials.comment })
    });
    const json = await response.json();
    console.log(json);
    if (!(json.success)) {
      alert('Enter valid credentials');
    }

  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div><Header /></div>
      <form onSubmit={handleSubmit} className='form mb-4'>
        <div action="" id="studentForm">
          <h1 className='h11'>You can find us here</h1>
          <h6>Find help for your queries here:</h6>
          <span className='span'>Name</span>
          <br />
          <input className="input1" type="text" name='name' placeholder="Full Name" value={credentials.name} onChange={onchange} />
          <br />
          <span className='span'>Email Address</span>
          <br />
          <input className="input1" type="text" name='email' placeholder="Email" value={credentials.email} onChange={onchange} />
          <br />
          <span className='span'>Mobile Number</span>
          <br />
          <input className="input1" type="text" name='mobilenumber' placeholder="Mobile Number" value={credentials.mobilenumber} onChange={onchange} />
          <br />
          <span className='span'>Comment</span>
          <br />
          <textarea className="textarea" name="comment" cols="21" rows="8" placeholder="Share Your Valuble Comment" value={credentials.comment} onChange={onchange} ></textarea>
          <br />
          <button className='button'>Submit</button>
        </div>
      </form>
      <div><Footer /></div>
    </div>
  )
}
