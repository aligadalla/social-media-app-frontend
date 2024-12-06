/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { useGetUser } from "./Authentication";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const {isLoading, isError, error} = useGetUser();

    if (isLoading) return <div>Loading...</div>;

    if (isError) {
        console.log(error.message);
        navigate('/login');
        return null;
    }

    return children;
}