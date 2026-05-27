import React from 'react';
import { sidebarData } from '../../constants/sidebarData';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <aside className='sidebar'>
        <h2>Omborxona CRM</h2>
        {sidebarData.map((item, index) => (
          <SidebarItem key={index} item={item}/>
        ))}
    </aside>
  )
}

export default Sidebar;