import React from 'react';
import './signButton.css';

const SignButton = ({buttonValue,className, onClick, type='button'}) => {
  return (
    <>
        <button className={` sign-in-btn ${className}`} onClick={onClick} type={type} >{buttonValue}</button> 
    </>
  )
}

export default SignButton;

