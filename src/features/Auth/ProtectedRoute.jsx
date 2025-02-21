import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useGetUser } from "./Authentication";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const tmp = useGetUser();
  const { isLoading, data, error } = tmp;

  useEffect(() => {
    console.log("protected route data", data);
    if (!isLoading && data?.message === "Not Logged In") {
      navigate("/login");
    }
  }, [data, navigate, isLoading]);

  if (data?.message === "Not Logged In") return null;

  if (isLoading) return <div>Loading...</div>;

  return children;
}
