import { Link } from "react-router-dom";

import logo from "../assets/logo.png"

export default function Error(){
    return (
        <>
            <div className="container text-center">
                <div className="logo-404">
                    <a href="index.html"><img src={logo} alt="" /></a>
                </div>
                <div className="content-404" style={{marginBottom:"400px"}}>
                    {/* <img src="images/404/404.png" className="img-responsive" alt="" /> */}
                    <h1><b>OPPS!</b> We Couldn’t Find this Page</h1>
                    <p>Uh... So it looks like you brock something. The page you are looking for has up and Vanished.</p>
                    <h2><Link to="/">Bring me back Home</Link></h2>
                </div>
            </div>
        </>
    )
}