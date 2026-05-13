import { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

type DashboardLayoutProps = {
  children: React.ReactNode;
  activeMenu: string;
};

function DashboardLayout({ children, activeMenu }: DashboardLayoutProps) {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
