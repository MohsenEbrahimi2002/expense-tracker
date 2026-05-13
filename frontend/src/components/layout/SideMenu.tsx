import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext, type UserContextType } from "../../context/UserContext";
import { useNavigate } from "react-router";

interface SideMenuProps {
  activeMenu: string;
}

function SideMenu({ activeMenu }: SideMenuProps) {
  const { user, clearUser } = useContext<UserContextType>(UserContext);
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border">
      <div className="flex flex-col items-center justify-center gap-4 p-4 border-b">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-semibold">
              {user?.fullName?.charAt(0) || "U"}
            </span>
          </div>
        )}
        <div className="text-center">
          <h5 className="text-gray-950 font-medium leading-6">
            {user?.fullName || "کاربر مهمان"}
          </h5>
          <p className="text-gray-500 text-sm">{user?.email || ""}</p>
        </div>
      </div>

      <div className="p-4">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={item.id || index}
            className={`
            w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-200
            ${
              activeMenu === item.label
                ? "bg-primary text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }
          `}
            onClick={() => handleClick(item.path)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
