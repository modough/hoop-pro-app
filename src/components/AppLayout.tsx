import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";


const AppLayout = () => {
  return (
    <div className="h-[100dvh] overflow-y-auto bg-background pb-16">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
