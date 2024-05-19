import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3  border-top bg-success ">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 " style={{ "color": "white" }}>© 2024 Easy4You, Inc</span>
        </div>
        <div className='foot1'>
          <Link to="#"><i class='bx bxl-facebook-circle social-media'></i></Link>
          <Link to="#"><i class='bx bxl-instagram-alt social-media'></i></Link>
          <Link to="#"><i class='bx bxl-linkedin social-media'></i></Link>
          <Link to="#"><i class='bx bxl-github social-media'></i></Link>
        </div>
      </footer>
    </div>
  )
}
