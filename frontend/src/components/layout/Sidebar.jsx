import React from 'react';
import {
  FaInbox,
  FaRegCalendarAlt,
  FaClipboardCheck,
  FaChevronDown
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li>
          <span>Inbox</span>
          <span>
            <FaInbox />
          </span>
        </li>
        <li>
          <span>Todo</span>
          <span>
            <FaClipboardCheck />
          </span>
        </li>
        <li>
          <span>Next 7 days</span>
          <span>
            <FaRegCalendarAlt />
          </span>
        </li>
      </ul>
      <div className='sidebar__middle'>
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className='sidebar__projects'>Projects will be here</ul>
      Add project comp here
    </div>
  );
};

export default Sidebar;
