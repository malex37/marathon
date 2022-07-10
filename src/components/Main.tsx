import { useEffect } from "react";
import Navbar from './display/Navbar';
import Routes from '../Routes';
import { checkAuth } from "../tools/AuthTools";

const Main = () => {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <Routes />
    </div>
  );
}

export default Main;
