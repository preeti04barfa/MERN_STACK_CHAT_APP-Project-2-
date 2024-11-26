import React, { useState } from 'react';
import Index from "../../container/index";
import "../userChat/UserChat.css";
import chatImage from "../../assets/jpg/chat-image.jpg";
import chatImage1 from "../../assets/jpg/chat-image1.jpg";
import chatImage2 from "../../assets/jpg/chat-image2.webp"
import { Input } from '@mui/material';


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
  { _id: 1, from: "Hi! How are you?", timestamp: "2024-11-22T10:00:00Z" },
  { _id: 2, to: "I'm good, thanks! What about you? kbdfkshb sa,dfhsakdf a,jsdfgbasdfk asfgasd fa,sdkfgbm df,asjkdkd c,asdkufhasdnfmahbs", image: [chatImage1, chatImage, chatImage2], timestamp: "2024-11-22T10:02:00Z" },
  { _id: 3, from: "I'm doing great! Working on a new project.", timestamp: "2024-11-22T10:05:00Z" },
  { _id: 4, from: "That’s awesome! Let me know if I can help.", timestamp: "2024-11-22T10:07:00Z" },
  { _id: 5, to: "Sounds good!",image: [chatImage1, chatImage2, chatImage], timestamp: "2024-11-25T10:15:00Z" },
  { _id: 6, from: "I'm doing great! Working on a new project.", timestamp: "2024-11-25T10:05:00Z" },
  { _id: 7, from: "That’s awesome! Let me know if I can help.", timestamp: "2024-11-25T10:07:00Z" },
  { _id: 8, to: "Sounds good!", timestamp: "2024-11-25T10:15:00Z" },
  { _id: 10, from: "That’s awesome! Let me know if I can help.", timestamp: "2024-11-25T10:07:00Z" },
  { _id: 11, to: "Sounds good!", timestamp: "2024-11-25T10:15:00Z" },
  { _id: 12, from: "That’s awesome! Let me know if I can help.", image: [chatImage, chatImage, chatImage1, chatImage, chatImage2, chatImage1], timestamp: "2024-11-25T10:07:00Z" },
  { _id: 13, to: "Sounds good!", timestamp: "2024-11-25T10:15:00Z" },
];

const UserChat = ({ selectedUser }) => {

  let lastDate = "";
  const [showAllImages, setShowAllImages] = useState({});
  const [messages, setMessages] = useState(chatArray);
  console.log(messages, "messages");


  const handleImageClick = (id) => {
    setShowAllImages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <>
      {selectedUser ? (<Index.Box className='main-chat-componenet'>
        <Index.Box className='main-chat-box'>
          {chatArray.map((msg, index) => {
            const messageDate = formatDate(msg.timestamp);
            const messageTime = formatTime(msg.timestamp);

            const showDateStatus = messageDate !== lastDate;
            lastDate = messageDate;
            const isImagesExpanded = showAllImages[msg._id] || false;
            return (
              <React.Fragment key={index}>
                {showDateStatus && (
                  <Index.Box className='day-date-status'>
                    <p className='msg-day-date'>{messageDate}</p>
                  </Index.Box>
                )}
                {/* senderside */}

                <Index.Box className='sender-reciver-box'>
                  {msg.to && (
                    <Index.Box className="message-right">
                      <Index.Box className="message-text-sender">
                        <p className="p-msgto">{msg.to}</p>
                        {msg.image && (
                          <Index.Box className="image-row">
                            {msg.image.slice(0, 2).map((image, imageIndex) => (
                              <Index.Box
                                key={imageIndex}
                                className={`image-wrapper ${imageIndex === 1 && msg.image.length > 2 && !showAllImages ? 'blurred' : ''
                                  }`}
                                onClick={imageIndex === 1 && msg.image.length > 2 && !isImagesExpanded ? () => handleImageClick(msg._id) : null}
                              >
                                <img
                                  src={image}
                                  alt={`Images ${imageIndex + 1}`}
                                  className="image-chat"
                                />
                                {imageIndex === 1 && msg.image.length > 2 && !isImagesExpanded && (
                                  <p className="image-overlay">+{msg.image.length - 2}</p>
                                )}
                              </Index.Box>
                            ))}

                            {isImagesExpanded && (
                              <Index.Box className="image-grid">
                                {msg.image.slice(2).map((image, imageIndex) => (
                                  <img
                                    key={imageIndex + 2}
                                    src={image}
                                    alt={`Images ${imageIndex + 3}`}
                                    className="image-chat"
                                  />
                                ))}
                              </Index.Box>
                            )}
                          </Index.Box>
                        )}
                        <p className="message-time-right">{messageTime}</p>
                      </Index.Box>
                    </Index.Box>
                  )}

                  {/* reciverside */}

                  <Index.Box className="message-main-box">
                    {msg.from && (
                      <Index.Box className="message-left">
                        <Index.Box className="message-text-reciver">
                          <p className="p-msgfrom">{msg.from}</p>
                          {msg.image && (
                            <Index.Box className="image-row">
                              {msg.image.slice(0, 2).map((image, imageIndex) => (
                                <Index.Box
                                  key={imageIndex}
                                  className={`image-wrapper ${imageIndex === 1 && msg.image.length > 2 && !isImagesExpanded ? 'blurred' : ''
                                    }`}
                                  onClick={imageIndex === 1 && msg.image.length > 2 && !isImagesExpanded ? () => handleImageClick(msg._id) : null}
                                >
                                  <img
                                    src={image}
                                    alt={`Images ${imageIndex + 1}`}
                                    className="image-chat"
                                  />
                                  {imageIndex === 1 && msg.image.length > 2 && !isImagesExpanded && (
                                    <p className="image-overlay">+{msg.image.length - 2}</p>
                                  )}
                                </Index.Box>
                              ))}

                              {isImagesExpanded && (
                                <Index.Box className="image-grid">
                                  {msg.image.slice(2).map((image, imageIndex) => (
                                    <img
                                      key={imageIndex + 2}
                                      src={image}
                                      alt={`Images ${imageIndex + 3}`}
                                      className="image-chat"
                                    />
                                  ))}
                                </Index.Box>
                              )}
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
                  <Index.Box className='file-attach-icon'>
                    <Index.AttachmentIcon className='attach-icon' onClick={handleIconClick} />
                    <Input className='select-file' type='file' id="fileInput"
                      style={{ display: 'none' }} />
                  </Index.Box>
                  <Index.Box className='msg-sent-icon'><Index.SendIcon className='sent-icon' /></Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      ) : (
        <Index.Box className="no-user-chat">
          <p className='no-user-msg'>No user chat found</p>
        </Index.Box>
      )}
    </>
  );
};

export default UserChat;