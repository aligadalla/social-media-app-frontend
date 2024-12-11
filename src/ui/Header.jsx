import { useNavigate } from "react-router-dom";
import { useGetUser, useLogout } from "../features/Auth/Authentication";

function Header () {
    const {data, isError: loggedOut} = useGetUser();
    const {createLogout} = useLogout();
    const navigate = useNavigate();

    async function handleLogout() {
      await createLogout();
      navigate('/login');
    }

    if (loggedOut) return null;

    return (
        <div>
          user data : {data.username}
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Header;