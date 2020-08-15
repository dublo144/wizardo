import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='header' data-testid='header'>
      <nav>
        <div className='logo'>
          <img src='/images/logo.png' alt='Wizardo' />
          <div className='settings'>
            <ul>
              <li>+</li>
              <li>
                <FaPizzaSlice />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
