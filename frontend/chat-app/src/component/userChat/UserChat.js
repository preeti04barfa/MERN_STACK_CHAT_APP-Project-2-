import React from 'react'
import Index from "../../container/index"
import "../userChat/UserChat.css"

const chatArray = [
  {
    from: "Hi! How are you?",
    timestamp: "2024-11-22T10:00:00Z",
  },
  {
    to: "I'm good, thanks! What about you?",
    timestamp: "2024-11-22T10:02:00Z",
  },
  {
    from: "I'm doing great! Working on a new project.I'm doing great! Working on a new project.",
    timestamp: "2024-11-22T10:05:00Z",
  },
  {
    from: "That’s awesome! Let me know if I can help.",
    timestamp: "2024-11-22T10:07:00Z",
  },
  {
    to: "I'm doing great! Working on a new project.",
    timestamp: "2024-11-22T10:05:00Z",
  },
  {
    to: "That’s awesome! Let me know if I can help.",
    timestamp: "2024-11-22T10:07:00Z",
  },
];


const UserChat = () => {
  return (
    // <Index.Box className='main-chat-componenet'>
    //   <Index.Box className='main-chat-box'>
    //     {chatArray.map((msg, index) => (
    //       <Index.Box
    //         className='sender-reciver-box'
    //         key={index}
    //       >
    //         <Index.Box className='msg-to-box'>
    //           <Index.Box className='msg-to'>
    //             <p>{msg.to}</p>
    //           </Index.Box>
    //         </Index.Box>
    //         <Index.Box  className='msg-from-box'>
    //           <Index.Box className='msg-from'>
    //             <p>{msg.from}</p>
    //           </Index.Box>
    //         </Index.Box>



    //       </Index.Box>


    //     ))}
    //   </Index.Box>
    //   <Index.Box className='main-send-msg'>
    //     <Index.Box className='main-send-contains'>
    //       <Index.Box className='main-home-icon'><Index.GridViewIcon className='icon-dashboard' /></Index.Box>
    //       <Index.Box className='main-sent-data'>
    //         <Index.Box className='main-send-box'>
    //           <Index.Box className='test-msg-write'>
    //             <Index.TextField className="outlined-basic" placeholder='Type your message' />
    //           </Index.Box>
    //           <Index.Box className='attach-sent-icon'>
    //             <Index.Box className='file-attach-icon'><Index.AttachmentIcon className='attach-icon' /></Index.Box>
    //             <Index.Box className='msg-sent-icon'><Index.SendIcon className='sent-icon' /></Index.Box>
    //           </Index.Box>
    //         </Index.Box>
    //       </Index.Box>
    //     </Index.Box>
    //   </Index.Box>
    // </Index.Box>

    <Index.Box className="message-main">
      <Index.Box className="message-main-box">
        <Index.Box className="message-right">
          <Index.Box className="message-text">
            <p>Hello</p>
          </Index.Box>
        </Index.Box>
        <Index.Box className="message-left">
          <Index.Box className="message-text">
            <p>Hello</p>
          </Index.Box>
        </Index.Box>
      </Index.Box>

      <Index.Box className="">
        <input></input>
      </Index.Box>
    </Index.Box>
  )
}

export default UserChat
