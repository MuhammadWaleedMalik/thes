import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();

  const colors = {
    primary: "#CADCFC",
    secondary: "#00246B",
    textDark: "#000000",
    background: "#00246B"
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      style={{ backgroundColor: "white"}}
    className="flex  flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;