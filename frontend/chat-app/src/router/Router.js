import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../container/user/sidebar/Sidebar';
import Main from '../container/user/main/Main';
import UserChat from '../component/userChat/UserChat';



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} > 
        <Route path="/chat" element={<UserChat />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
