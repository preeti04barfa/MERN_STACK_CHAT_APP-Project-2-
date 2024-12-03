import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../container/user/main/Main';
import Login from '../container/user/addUser/Login';

const Router = ({socket}) => {
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/" element={<Login socket={socket}/>} />
        <Route path="/chat" element={<Main socket={socket} />} > 
        {/* <Route path="/chat" element={<UserChat />} />  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
