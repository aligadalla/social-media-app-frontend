import { useEffect } from "react";
import { useGetUser } from "../Auth/Authentication";
import openSocket from 'socket.io-client';

import Users from './Users';
import Chat from './Chat';

function ChatLayout()
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
    return (
        <div>
            <Users userData={data}/>
            <Chat />
        </div>
    )
}

export default ChatLayout;