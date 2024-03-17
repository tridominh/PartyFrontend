export default function Contact() {
    return (
        <div className="contact">
            <div className="container">
                <div className="section-header text-center">
                    <p>Contact Us</p>
                    <h2>Contact For Any Query</h2>
                </div>
                <div className="row align-items-center contact-information">
                    <div className="col-md-6 col-lg-3">
                        <div className="contact-info">
                            <div className="contact-icon">
                                <i className="fa fa-map-marker-alt"></i>
                            </div>
                            <div className="contact-text">
                                <h3>Address</h3>
                                <p>FPT University</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="contact-info">
                            <div className="contact-icon">
                                <i className="fa fa-phone-alt"></i>
                            </div>
                            <div className="contact-text">
                                <h3>Call Us</h3>
                                <p>+098 765 4321</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="contact-info">
                            <div className="contact-icon">
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className="contact-text">
                                <h3>Email Us</h3>
                                <p>birthdayparty@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="contact-info">
                            <div className="contact-icon">
                                <i className="fa fa-share"></i>
                            </div>
                            <div className="contact-text">
                                <h3>Follow Us</h3>
                                <div className="contact-social">
                                    <a href="">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                    <a href="">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
