import React from 'react';
import Sidebar from './Sidebar';
import Tasks from '../Tasks';
import { AuthProvider } from '../../context/AuthContext';

const Content = () => {
  return (
    <section>
      <Sidebar />
      <AuthProvider>
        <Tasks />
      </AuthProvider>
    </section>
  );
};

export default Content;
