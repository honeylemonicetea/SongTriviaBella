import React from 'react'
import {NavLink} from 'react-router-dom'

function Header() {
  return (
    <header className='menu-container'>
      <div className="menu-inner">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/'></NavLink>
        <NavLink to='/'></NavLink>
        <NavLink to='/'></NavLink>
      </div>
    </header>
  );
}

export default Header