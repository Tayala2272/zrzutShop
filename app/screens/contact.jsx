

export default function Contact(){
    return(
        <>
            <div id="contact-page" className="container" style={{marginBottom:"200px"}}>
                <div className="bg">
                    <div className="row">
                    <div className="col-sm-8">
                        <div className="contact-form">
                        <h2 className="title text-center">Napisz do nas</h2>
                        <div className="status alert alert-success" style={{ display: 'none' }}></div>
                        <form id="main-contact-form" className="contact-form row" name="contact-form" method="post">
                            <div className="form-group col-md-6">
                            <input type="text" name="name" className="form-control" required placeholder="Imie" />
                            </div>
                            <div className="form-group col-md-6">
                            <input type="email" name="email" className="form-control" required placeholder="Email" />
                            </div>
                            <div className="form-group col-md-12">
                            <input type="text" name="subject" className="form-control" required placeholder="Temat" />
                            </div>
                            <div className="form-group col-md-12">
                            <textarea name="message" id="message" required className="form-control" rows={8} placeholder="Twoja wiadomość"></textarea>
                            </div>
                            <div className="form-group col-md-12">
                            <input type="submit" name="submit" className="btn btn-primary pull-right" value="Submit" />
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="contact-info">
                        <h2 className="title text-center">Kontakt</h2>
                        <address>
                            <p>ZozulaDrop</p>
                            <p>Katowice</p>
                            <p>Poland</p>
                            <p>Phone: (+48) 000 000 000</p>
                            <p>Email: mail@gmail.com</p>
                        </address>
                        <div className="social-networks">
                            <h2 className="title text-center">Social Media</h2>
                            <ul>
                            <li>
                                <a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-youtube"></i></a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </>
    )
}