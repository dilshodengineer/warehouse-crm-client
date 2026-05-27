import React from 'react';
import LogoutBtn from '../ui/LogoutBtn';

function Navbar() {
  return (
    <header className='navbar'>
      <div className="d-flex justify-content-end w-100 align-items-center">
        <LogoutBtn/>
      </div>
    </header>
  )
}

export default Navbar;