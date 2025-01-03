import { useNavigate } from "react-router-dom";
import { useGetUser, useLogout } from "../features/Auth/Authentication";

function Header() {
  const { data } = useGetUser();
  const { createLogout } = useLogout();
  const navigate = useNavigate();
  // console.log("header", data);
  async function handleLogout() {
    await createLogout();
    navigate("/login");
  }

  return (
    <div>
      user data : {data?.username}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
