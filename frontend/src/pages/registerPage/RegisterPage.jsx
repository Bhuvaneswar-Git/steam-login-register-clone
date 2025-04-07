import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SignButton from '../../components/signButton/SignButton';
import authInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import './registerPage.css';


const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate()

    const handleRegister = async (e)=> {

        e.preventDefault()

        if(!email || !confirmEmail || !password){
            return setMessage('All fields are required')
        };

        if (email !== confirmEmail) {
            return setMessage('Email addresses do not match');
        };

        try {

            const response = await authInstance.post('/register', {
                email,
                password
            });

            if (response.status === 201) {
                toast.success(response.data.message || 'Registered successfully');
                setTimeout(()=>navigate("/home"),3000); // Redirect after 3 sec delay to home page
            }

        } catch (error) {
            if(error.response?.data?.message === "User already exists"){
                toast.error('This email is already registered');
            } else {
                toast.error(error.response?.data?.message || 'Registration failed');
            }
        }
    };

  return (
    <>
      <div className="register-content">
            <div className="create-acc-page">
                <div className="create-acc-content">
                    <div className="join-form">
                        {message && <div className='field-message'>{message}</div>}
                        <div className='section-title'>Create your account</div>
                        <div className="form-row row-flex">
                            <div className="form-area">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id='email' name='email' onChange={(e)=> setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-row row-flex">
                            <div className="form-area">
                                <label htmlFor="confirmEmail">Confirm your Address</label>
                                <input type="email" id='confirmEmail' name='confirmEmail' onChange={(e)=> setConfirmEmail(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-row row-flex">
                            <div className="form-area">
                                <label htmlFor="password">Password</label>
                                <input type="password" id='password' name='password' onChange={(e)=> setPassword(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="checkbox-text">
                                <input type="checkbox" required />
                                <label>
                                    I am 13 years of age or older and agree to the terms of the  
                                    <b> Steam Subscriber Agreement</b> and the 
                                    <b> Value Privacy Policy </b>
                                </label>
                            </div>
                            <div className='register-btn'>
                                <SignButton buttonValue={'Register'} className='register-style-btn' onClick={ handleRegister }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </>
  )
}

export default RegisterPage;
