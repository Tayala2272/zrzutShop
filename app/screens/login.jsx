
import GoogleButton from 'react-google-button'

import { AppContext } from '../hooks/firebaseContext';

import { useState } from 'react';

import { useNavigate } from "react-router-dom";

  

export default function Login(){
    const {handleGoogleSignIn, handleEmailSignIn, user} = AppContext()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        handleEmailSignIn(email,password)
    }

    // Jeśli jest zalogowany to przenosi na strone główną
        const navigate = useNavigate();
        if (user) {
            navigate('/')
        }

    return (
        <>

            <section id="form">
            <div className="container">
                <div className="row">
                <div className="col-sm-4 col-sm-offset-1">
                    <div className="login-form">
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email Adress" onChange={handleEmailChange} required/>
                        <input type="password" placeholder="Password" onChange={handlePasswordChange} required/>
                        <button type="submit" className="btn btn-default">Login</button>
                    </form>
                    </div>
                </div>
                <div className="col-sm-1 col-sm-offset-1">
                    <h2 className="or">Albo</h2>
                </div>
                <div className="col-sm-3 col-sm-offset-1" style={{alignItems:"center"}}>
                    <GoogleButton onClick={()=>handleGoogleSignIn()}/>
                    {/* <div className="signup-form">
                    <h2>New User Signup!</h2>
                    <form action="#">
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email Address"/>
                        <input type="password" placeholder="Password"/>
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                    </div> */}
                </div>
                </div>
            </div>
            </section>

        </>
    )
}