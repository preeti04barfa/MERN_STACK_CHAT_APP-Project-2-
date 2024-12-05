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
    const [seenMessages, setSeenMessages] = useState({});

    const getUserId = () => localStorage.getItem('userId');

    useEffect(() => {
        if (socket) {
            socket.on('users', (userList) => {
                const filteredUsers = userList.filter(user => user.id !== getUserId());
                setUsers(filteredUsers);
            });

            socket.on('message seen', ({ sender, receiver, isRead }) => {
                setSeenMessages(prevState => ({
                  ...prevState,
                  [sender]: isRead,
                  [receiver]: isRead,
                }));
              });
        

            return () => {
                socket.off('users');
                socket.off('message seen');
            };
        }
    }, [socket]);

    const filteredData = users.filter((item) =>
        item.userName.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <Index.Box className="user-list">
            <Index.Box className="userlist-container">
                {filteredData.map((user) => {
                    {console.log(user.sender ,socket?.id,"user")}
                    return(

                    <Index.Box
                        className={`userdata-main ${user.userName === selectedUser ? 'selected' : ''}`}
                        key={user.id}
                        onClick={() => {
                            setSelectedUser(user);
                            if (socket) {
                                socket.emit('get messages', { senderId: getUserId(), receiverId: user.id });
                                socket.emit('message opened', { sender: getUserId(), receiver: user.id });
                            }
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
                                    <p>{user?.message && user?.message?.length > 25 ? `${user.message.slice(0, 25)}...` : user?.message}</p>
                                </Index.Box>
                                <Index.Box>
                                    {user?.message && user?.message !== "No message" && user.sender === socket?.id && (
                                        
                                        <Index.DoneAllIcon
                                            style={{ color: seenMessages[user.sender] || user.isRead  ? 'green' : 'gray' }} 
                                        />
                                    )}
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                )})}
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
