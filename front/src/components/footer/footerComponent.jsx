import "./style.css";
import {AnimatedFade} from 'components'

export default function FooterComponent() {
    return (
        <AnimatedFade animation="fade-in" className="footer container-fluid d-flex flex-column flex-c-b min-height-60">
            {/* Upper */}
            <div className="upper w-100 py-3">
                <div className="container d-flex flex-wrap flex-b-c flex-xl-c-c child-col-12 child-col-xl-6 px-3 py-2">
                    <div className="t-center upperText">Get Connected with us on social networks</div>
                    <div className="list t-center">
                        <ul className="d-flex flex-c-c child-ml-3">
                            <li><img src="facebook.svg" alt="google" /></li>
                            <li><img src="github.svg" alt="" /></li>
                            <li><img src="google.svg" alt="" /></li>
                            <li><img src="instagram.svg" alt="" /></li>
                            <li><img src="linkedin.svg" alt="" /></li>
                            <li><img src="github.svg" alt="" /></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Middle */}
            <div className="middle w-100 d-flex flex-c-c py-5">
                <div className="container d-flex flex-wrap flex-c-c child-col-12 child-col-lg-6 child-col-xl-3  child-p-3">
                    <div className="companyName">
                        <div>
                            <div className="heading">COMPANY NAME</div>
                        </div>
                        <div className="content">
                            <ul>
                                <li className="lh-4">
                                    Here you can use rows and columns to organize your footer content. Lorem ipsum dolor
                                    sit amet, consectetur adipisicing elit.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="products">
                        <div>
                            <div className="heading">PRODUCTS</div>
                        </div>
                        <div className="content">
                            <ul>
                                <li>AbuAlmagd</li>
                                <li>MDWordPress</li>
                                <li>BrandFlow</li>
                                <li>Bootstrap Angular</li>
                            </ul>
                        </div>
                    </div>

                    <div className="userfulLinks">
                        <div>
                            <div className="heading">USEFUL LINKS</div>
                        </div>
                        <div className="content">
                            <ul>
                                <li>Your Account</li>
                                <li>Become an Affiliate</li>
                                <li>Shipping Rates</li>
                                <li>Help</li>
                            </ul>
                        </div>
                    </div>

                    <div className="contact">
                        <div>
                            <div className="heading">CONTACT</div>
                        </div>
                        <div className="content">
                            <ul>
                                <li>New Cairo, NY 10012, US</li>
                                <li>info@example.com</li>
                                <li>+0123456789</li>
                                <li>+0123456789</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower */}
            <div className="lower w-100 py-5 d-flex flex-c-c">
                <div className="d-flex flex-c-c">
                    <div>© 2020 Copyright: AbuAlmagd.com</div>
                </div>
            </div>
        </AnimatedFade>
    );
}
