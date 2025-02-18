import { useState } from "react";
import { useGetUsers } from "./apiChat";

import User from './User';

function Users ({ userData }) {
    const [searchQuery, setSearchQuery] = useState('');
    const {data: users, isLoading, error, isError} = useGetUsers(searchQuery);

    console.log(users);

    return (
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <div>
                <ul>
                    {users?.map(user => (
                        <User key={user.id} user={user}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Users;