import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../container/user/sidebar/Sidebar';
import Main from '../container/user/main/Main';



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
