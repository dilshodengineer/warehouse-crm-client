import React from 'react';
import LogoutBtn from '../ui/LogoutBtn';
import ListBtn from '../ui/ListBtn';

function Navbar() {
  return (
    <header className='navbar px-4'>
      <div className="d-flex justify-content-between w-100 align-items-center gap-3">
        <ListBtn/>
        <LogoutBtn/>
      </div>
    </header>
  )
}

export default Navbar;