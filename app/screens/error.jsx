import { Link } from "react-router-dom";

export default function Error(){
    return (
        <>
            <div className="container text-center">
                <div className="logo-404">
                    <a href="index.html"><img src="https://firebasestorage.googleapis.com/v0/b/zrzutshop.appspot.com/o/logo.png?alt=media&token=6fb96135-16db-4471-92e5-878ea1579aa0" alt="" /></a>
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