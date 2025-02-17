import { useEffect } from "react";
import openSocket from 'socket.io-client';
function Chat()
{
    useEffect(function(){
        openSocket('http://localhost:3000');
        
    },[])
    return  <div>
        chat
    </div>
}

export default Chat;