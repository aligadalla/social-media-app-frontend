/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { useGetUser } from "./Authentication";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const tmp = useGetUser();
  const { isLoading, data, error } = tmp;
  console.log(tmp);
  if (isLoading) return <div>Loading...</div>;

  if (!data) {
    console.log(error.message);
    navigate("/login");
    // return null;
  }

  return children;
}
