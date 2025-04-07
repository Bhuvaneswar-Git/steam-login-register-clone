import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './login.css';
import SignButton from '../../components/signButton/SignButton';
import { useNavigate } from 'react-router-dom';
import authInstance from '../../axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleRouter = ()=> {
        navigate('/auth/register')
    }

    const handleLogin = async (e)=>{

        e.preventDefault()
        
        if(!email || !password){
            toast.dismiss(); // Close all toasts before showing new one
            toast.error('All filed are required')
            return;
        }

        try {
            
            const response = await authInstance.post('/login',{
                email,
                password
            });

            if(response.status == 200){

                const {token, tokenExpiration} = response.data
             
                localStorage.setItem("email", email);
                localStorage.setItem("token", token);
                localStorage.setItem("tokenExpiration", tokenExpiration);

                toast.success('Login successful!');
                setTimeout(() => navigate("/home"), 3000); // Redirect after 3s delay to home page
            }

        } catch (error) {
            toast.dismiss();
            const message = error.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(message);
        }

    };   

  return (
    <>
        <div className="login-content">
            <div className="sign-in-content d-flex flex-column justify-content-center align-items-center">
                <div className='content-height-width'>
                    <div className="title">
                        Sign in
                    </div>
                    <div className="login-form">
                        <form className='form-spacing'>
                            <div className='name form-input'>
                                <span>Sign in with account name</span>
                                <input type="email" name="email" id="email" onChange={ (e)=> setEmail(e.target.value)} />
                            </div>
                            <div className='pass form-input'>
                                <span>Password</span>
                                <input type="password" name="password" id="password" onChange={ (e)=> setPassword(e.target.value)} />
                            </div>
                            <div className='remember-me'>
                                <input type="checkbox" id="rememberme" />
                                <label htmlFor="rememberme" data-bs-toggle="tooltip" 
                                    title="Next time you start Steam you won't need to enter your password or confirm your sign in">
                                    Remember me
                                </label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <SignButton buttonValue={'Sign in'} onClick={handleLogin}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
        <div className="login-bottom-row d-flex justify-content-center">
            <div className='center-content d-flex '> 
                <div className="create-acc-btn-content create-acc-sec">
                    <span>New to Steam?</span>
                    <SignButton buttonValue={'Create an account'} className='create-acc-btn' onClick={handleRouter}/>
                </div>
                <div className="create-acc-text create-acc-sec text-center">
                    <span>It's free and easy. Discover thousands of games to play with millions of new friends.</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login;
