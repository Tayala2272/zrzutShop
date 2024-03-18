
import GoogleButton from 'react-google-button'

import { AppContext } from '../hooks/firebaseContext';

import { useNavigate } from "react-router-dom";

  

export default function Login(){
    const {handleGoogleSignIn, user} = AppContext()

    // Jeśli jest zalogowany to przenosi na strone główną
        const navigate = useNavigate();
        if (user !== null) {
            navigate('/')
        }

    return (
        <>

            <section id="form">
            <div className="container">
                <div className="row">
                <div className="col-sm-4 col-sm-offset-1">
                    <div className="login-form">
                    <h2>Więcej opcji logowania wkrótce</h2>
                    {/* <form action="#">
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email Address" />
                        <button type="submit" className="btn btn-default">Login</button>
                    </form> */}
                    </div>
                </div>
                <div className="col-sm-1">
                    <h2 className="or">Albo</h2>
                </div>
                <div className="col-sm-4">
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