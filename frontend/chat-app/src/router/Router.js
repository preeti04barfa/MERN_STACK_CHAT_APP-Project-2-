import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../container/user/main/Main';
import AddUser from '../container/user/addUser/AddUser';
import Login from '../container/user/addUser/Login';
// import LoginUser from '../container/user/addUser/LoginUser';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/" element={<Login />} />
      <Route  path="/add/user" element={<AddUser />} />
        <Route path="/chat" element={<Main />} > 
        {/* <Route path="/chat" element={<UserChat />} />  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
