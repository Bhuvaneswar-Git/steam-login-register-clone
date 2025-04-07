import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';
import logo from '../../assets/svg/logo-steam.svg';
import SignButton from '../../components/signButton/SignButton';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="content d-flex align-items-center justify-content-center">
      <div className="welcome-content d-flex flex-column align-items-center justify-content-center">
        <h1>Welcome to</h1>
        <img src={logo} alt="Steam Logo" />
        <SignButton buttonValue="Continue" onClick={() => navigate('/auth/login')} />
      </div>
    </div>
  );
};

export default LandingPage;
