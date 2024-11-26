import React, { useState } from 'react';
import Index from "../../index";
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import "./main.css";
import { Outlet } from 'react-router-dom';
import UserChat from '../../../component/userChat/UserChat';


const Main = () => {
    const [selectedUser, setSelectedUser] = useState(null); 

    return (
        <Index.Box className='header-sidebar'>
            <Index.Box>
                <Sidebar setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
            </Index.Box>
            <Index.Box>
                <Index.Box>
                    <Header selectedUser={selectedUser} />
                </Index.Box>
                <Index.Box>
                    <Outlet />
                </Index.Box>
                <UserChat selectedUser={selectedUser}  />
            </Index.Box>
        </Index.Box>
    );
};

export default Main;
