import { useEffect, useState } from "react";
import Router from "./router/Router";
import io from "socket.io-client";
function App() {
  const [socket, setSocket] = useState(null)
  console.log(socket?.id,"socketsocket");
  
  
  useEffect(()=>{
    const socketUrl = io('http://localhost:3002');
    setSocket(socketUrl)
    
  },[])
  return (
    <><Router socket={socket}/></>
  );
}

export default App;
