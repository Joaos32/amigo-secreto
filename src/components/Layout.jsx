import { ToastContainer } from "react-toastify";
import ThemeToggle from "./ThemeToggle";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <ThemeToggle />
      {children}
    </div>
  );
};

export default Layout;
