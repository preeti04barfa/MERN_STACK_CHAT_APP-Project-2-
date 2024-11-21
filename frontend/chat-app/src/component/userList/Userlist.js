import React from 'react';
import Index from '../../container/index';
import "../userList/Userlist.css";
import avtarImage from "../../assets/png/avtar.png";

const Userlist = () => {
    const userMessages = [
        { userName: 'Preeti', message: 'Hello there!', time: '10:30 AM', isRead:true },
        { userName: 'Durgesh', message: 'How are you?', time: '10:35 AM', isRead:true },
        { userName: 'Jagriti', message: 'Good morning!', time: '10:40 AM',isRead:false },
        { userName: 'Jatin', message: 'See you soon.', time: '10:50 AM',isRead:true },
        { userName: 'Nilesh', message: 'Good morning!', time: '10:40 AM',isRead:false },
        { userName: 'Surbhi', message: 'See you soon.', time: '10:50 AM',isRead:true },
        { userName: 'Sachin', message: 'See you soon.', time: '10:50 AM',isRead:true },
    ];

    return (
        <Index.Box className="user-list">
            <Index.Box className="userlist-container">
                {userMessages.map((user, index) => (
                    <Index.Box className="userdata-main" key={index}>
                        <Index.Box className="user-image">
                            <img src={avtarImage} alt={`${user.userName}'s avatar`} />
                        </Index.Box>
                        <Index.Box className="usermsg-main">
                            <Index.Box className="name-time">
                                <Index.Box className="user-name">
                                    <p><strong>{user.userName}</strong></p>
                                </Index.Box>
                                <Index.Box className="user-time">
                                    <p>{user.time}</p>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="user-msg">
                                <Index.Box>  <p>{user.message}</p></Index.Box>
                                <Index.Box><p><Index.DoneAllIcon  style={{ color: user.isRead ? 'blue' : 'gray' }} /></p></Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                ))}
            </Index.Box>
        </Index.Box>
    );
};

export default Userlist;
