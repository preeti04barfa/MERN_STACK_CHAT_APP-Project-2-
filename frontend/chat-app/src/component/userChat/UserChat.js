import React, { useState } from 'react';
import Index from "../../container/index";
import "../userChat/UserChat.css";
import chatImage from "../../assets/jpg/chat-image.jpg"

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
};


const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const chatArray = [
  { from: "Hi! How are you?", timestamp: "2024-11-22T10:00:00Z" },
  { to: "I'm good, thanks! What about you?", timestamp: "2024-11-22T10:02:00Z" },
  { from: "I'm doing great! Working on a new project.", timestamp: "2024-11-22T10:05:00Z" },
  { from: "That’s awesome! Let me know if I can help.", timestamp: "2024-11-22T10:07:00Z" },
  { to: "Sounds good!", timestamp: "2024-11-25T10:15:00Z" },
  { from: "I'm doing great! Working on a new project.", timestamp: "2024-11-25T10:05:00Z" },
  { from: "That’s awesome! Let me know if I can help.", timestamp: "2024-11-25T10:07:00Z" },
  { to: "Sounds good!", timestamp: "2024-11-25T10:15:00Z" },
  { from: "That’s awesome! Let me know if I can help.", timestamp: "2024-11-25T10:07:00Z" },
  { to: "Sounds good!", timestamp: "2024-11-25T10:15:00Z" },
  { from: "That’s awesome! Let me know if I can help.", image: [chatImage, chatImage,chatImage, chatImage], timestamp: "2024-11-25T10:07:00Z" },
  { to: "Sounds good!", timestamp: "2024-11-25T10:15:00Z" },
];

const UserChat = () => {
  let lastDate = "";
  const [showAllImages, setShowAllImages] = useState(false);

  // Handle the image click to toggle the display of all images
  const handleImageClick = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <Index.Box className='main-chat-componenet'>
      <Index.Box className='main-chat-box'>
        {chatArray.map((msg, index) => {
          const messageDate = formatDate(msg.timestamp);
          const messageTime = formatTime(msg.timestamp);

          const showDateStatus = messageDate !== lastDate;
          lastDate = messageDate;

          return (
            <React.Fragment key={index}>
              {showDateStatus && (
                <Index.Box className='day-date-status'>
                  <p className='msg-day-date'>{messageDate}</p>
                </Index.Box>
              )}
              <Index.Box className='sender-reciver-box'>
              <Index.Box className="message-main-box">
      {msg.to && (
        <Index.Box className="message-right">
          <Index.Box className="message-text-sender">
            <p className="p-msgto">{msg.to}</p>
            {msg.image && (
              <Index.Box className="image-row">
       
                {msg.image.slice(0, 2).map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image}
                    alt={`Image ${imageIndex + 1}`}
                    className="image-chat"
                  />
                ))}
       
                {msg.image.length > 2 && !showAllImages && (
                  <p onClick={handleImageClick} className="image-count">
                    +{msg.image.length - 2} more
                  </p>
                )}
             
                {showAllImages &&
                  msg.image.slice(2).map((image, imageIndex) => (
                    <img
                      key={imageIndex + 2} 
                      src={image}
                      alt={`Image ${imageIndex + 3}`} 
                      className="image-chat"
                    />
                  ))}
              </Index.Box>
            )}
            <p className="message-time-right">{messageTime}</p>
          </Index.Box>
        </Index.Box>
      )}

      {msg.from && (
        <Index.Box className="message-left">
          <Index.Box className="message-text-reciver">
            <p className="p-msgfrom">{msg.from}</p>
            {msg.image && (
              <Index.Box className="image-row">
                {msg.image.slice(0, 2).map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image}
                    alt={`Image ${imageIndex + 1}`}
                    className="image-chat"
                  />
                ))}
          
                {msg.image.length > 2 && !showAllImages && (
                  <p onClick={handleImageClick} className="image-count">
                    +{msg.image.length - 2} more
                  </p>
                )}
                {showAllImages &&
                  msg.image.slice(2).map((image, imageIndex) => (
                    <img
                      key={imageIndex + 2} 
                      src={image}
                      alt={`Image ${imageIndex + 3}`} 
                      className="image-chat"
                    />
                  ))}
              </Index.Box>
            )}
            <p className="message-time-left">{messageTime}</p>
          </Index.Box>
        </Index.Box>
      )}
    </Index.Box>
              </Index.Box>
            </React.Fragment>
          );
        })}
      </Index.Box>
      <Index.Box className='main-send-msg'>
        <Index.Box className='main-send-contains'>
          <Index.Box className='main-home-icon'><Index.GridViewIcon className='icon-dashboard' /></Index.Box>
          <Index.Box className='main-sent-data'>
            <Index.Box className='main-send-box'>
              <Index.Box className='test-msg-write'>
                <Index.TextField className="outlined-basic" placeholder='Type your message' />
              </Index.Box>
              <Index.Box className='attach-sent-icon'>
                <Index.Box className='file-attach-icon'><Index.AttachmentIcon className='attach-icon' /></Index.Box>
                <Index.Box className='msg-sent-icon'><Index.SendIcon className='sent-icon' /></Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default UserChat;