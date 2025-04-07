import React, { useEffect } from 'react';
import './home.css';
import gta5 from '../../assets/jpg/gta-5.jpg';
import gta6 from '../../assets/jpg/gta-6.jpg';
import rdr2 from '../../assets/jpg/rdr-2.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!tokenExpiration) return;

    const timeRemaining = parseInt(tokenExpiration) - Date.now();

    if (timeRemaining <= 0) {
      handleLogout();
    } else {
      const timeout = setTimeout(() => {
        handleLogout();
      }, timeRemaining);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <>
        <h1 className='title-home text-center'>Welcom to home page</h1>

        <div className="poster">
            <div className="poster-img"> <img src={gta5} alt="gta-5" /> </div>
            <div className="poster-img"> <img src={gta6} alt="gta-5" /> </div>
            <div className="poster-img"> <img src={rdr2} alt="gta-5" /> </div>
        </div>
    </>
  )
}

export default Home;
