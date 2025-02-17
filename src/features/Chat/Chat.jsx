import { useEffect } from "react";
import { useGetUser } from "../Auth/Authentication";
import openSocket from 'socket.io-client';

function Chat()
{
    const {data} = useGetUser();
    useEffect(function(){
        if (!data)
            return;
        openSocket('http://localhost:3000', {
            query: {
                userId: data?.userId,
            }
        });
        
    },[data])
    return  <div>
        chat
    </div>
}

export default Chat;