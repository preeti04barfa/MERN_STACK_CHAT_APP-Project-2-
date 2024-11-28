import React from 'react';
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



    // if (messageDate.toDateString() === yesterday.toDateString()) {
    //     return 'Yesterday';
    // }


    const diffInDays = Math.floor((today - messageDate) / (1000 * 3600 * 24));
    if (diffInDays <= 6) {

        return messageDate.toLocaleString('en-us', { weekday: 'short' });
    }
    return messageDate.toLocaleDateString();
};

const userMessages = [
    { userName: 'Preeti', message: 'Hello there!Hello there!Hello there!Hello there!', time: '2024-11-28T10:05:00Z', isRead: true },
    { userName: 'Durgesh', message: 'How are you?', time: '2024-11-27T10:05:00Z', isRead: true },
    { userName: 'Jagriti', message: 'Good morning!', time: '2024-11-26T10:05:00Z', isRead: false },
    { userName: 'Jatin', message: 'See you soon.', time: '2024-11-25T10:05:00Z', isRead: true },
    { userName: 'Nilesh', message: 'Good morning!', time: '2024-11-24T10:05:00Z', isRead: false },
    { userName: 'Surbhi', message: 'See you soon.', time: '2024-11-23T10:05:00Z', isRead: true },
    { userName: 'Sachin', message: 'See you soon.', time: '2024-11-22T10:05:00Z', isRead: true },
    { userName: 'Sachin', message: 'See you soon.', time: '2024-11-21T10:05:00Z', isRead: true },
    { userName: 'Sachin', message: 'See you soon.', time: '2024-11-03T10:05:00Z', isRead: true },
];

const Userlist = ({ searchUser, selectedUser, setSelectedUser }) => {
    const filteredData = userMessages.filter((item) =>
        item.userName.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <Index.Box className="user-list">
            <Index.Box className="userlist-container">
                {filteredData.map((user, index) => (
                    <Index.Box
                        className={`userdata-main ${user.userName === selectedUser ? 'selected' : ''}`}
                        key={index}
                        onClick={() => setSelectedUser(user.userName)}
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
