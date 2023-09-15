import React from 'react'
import GoogleLogo from '../assets/GoogleLogo.svg'
import './styles.css'

function Navbar() {
  return (
    <div className='navbar'>
        <img src={GoogleLogo} alt="GoogleLogo" className='google-logo'/>
        <h4>Pixel Sales Dashboard</h4> 
        {/* <span> &gt; US</span> */}
    </div>
  )
}

export default Navbar