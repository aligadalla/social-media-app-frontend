import { Link, useNavigate } from "react-router-dom";
import { useGetUser, useLogout } from "../features/Auth/Authentication";

function Header({ setIsSidebarOpen }) {
  const { data } = useGetUser();
  const { createLogout } = useLogout();
  const navigate = useNavigate();

  async function handleLogout() {
    await createLogout();
    navigate("/login");
  }

  return (
    <header className="w-full bg-gray-100 shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button 
          type="button" 
          onClick={() => setIsSidebarOpen(isOpen => !isOpen)}
          className="text-blue-500 hover:text-blue-600"
        >
          {/* Sidebar Icon */}
          &#9776;
        </button>

        <Link to={`/profile/${data?.userId}`} className="flex items-center space-x-2">
          <img 
            src={`http://localhost:3000/${data?.imgUrl ? data.imgUrl : "image.png"}`} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <span className="text-gray-800 hover:underline">{data?.username}</span>
        </Link>
      </div>

      <button 
        type="button" 
        onClick={handleLogout} 
        className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;