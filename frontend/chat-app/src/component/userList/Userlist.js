import React, { useEffect, useState } from 'react';
import Index from '../../container/index';
import "../userList/Userlist.css";
import avtarImage from "../../assets/png/avtar.png";

const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const diffInDays = Math.floor((today - messageDate) / (1000 * 3600 * 24));
    if (diffInDays <= 6) {
        return messageDate.toLocaleString('en-us', { weekday: 'short' });
    }
    return messageDate.toLocaleDateString();
};

const Userlist = ({ searchUser, selectedUser, setSelectedUser, socket }) => {
    const [users, setUsers] = useState([]);
    const [handleUserId, setHandleUserId] = useState('');
    console.log(users, "usersusers");
    const getUserId = localStorage.getItem('userId');
    console.log(getUserId, "getUserId")
    useEffect(() => {
        if (socket) {
            socket.on('users', (userList) => {
                console.log(userList, "userList");
                const filteredUsers = userList.filter(user => user.id !== getUserId);
                setUsers(filteredUsers);
            });
            return () => {
                socket.off('users');
            };
        }
    }, [socket]);

    const handleCreateRoom = () => {
        if (socket) {
            socket.on('join room', (getUserId,handleUserId) => {
                setUsers(filteredUsers);
            });
            return () => {
                socket.off('users');
            };
        }
    }

    const filteredData = users.filter((item) =>
        item.userName.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <Index.Box className="user-list">
            <Index.Box className="userlist-container">
                {filteredData.map((user, index) => (
                    <Index.Box
                        className={`userdata-main ${user.userName === selectedUser ? 'selected' : ''}`}
                        key={index}
                        onClick={() => {
                            setSelectedUser(user.userName);
                            handleUserId(user.id); // Assuming you want to handle `user.id` in some way
                        }}

                    >
                        <Index.Box className="user-image">
                            <img src={avtarImage} alt={`${user.userName}'s avatar`} />
                        </Index.Box>
                        <Index.Box className="usermsg-main">
                            <Index.Box className="name-time">
                                <Index.Box className="user-name">
                                    <p><strong>{user.userName}</strong></p>
                                </Index.Box>
                                <Index.Box className="user-time">
                                    <p>{formatDate(user.time)}</p>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="user-msg">
                                <Index.Box>
                                    <p>{user.message.length > 25 ? `${user.message.slice(0, 25)}...` : user.message}</p>
                                </Index.Box>
                                <Index.Box>
                                    <p>
                                        <Index.DoneAllIcon
                                            style={{ color: user.isRead ? 'blue' : 'gray' }}
                                        />
                                    </p>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                ))}
                {filteredData.length === 0 && (
                    <Index.Box className="no-data">
                        <p>No users found.</p>
                    </Index.Box>
                )}
            </Index.Box>
        </Index.Box>
    );
};

export default Userlist;
