import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './carousel.css';
import { Link } from 'react-router-dom';

function Carousell(){
    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    };
    return (
        <OwlCarousel className='owl-theme' {...options}>
            <div className='item'>
                <div className="carousel-img">
                    <img src="/img/carousel-1.jpg" alt="Image"/>
                </div>
                <div className="carousel-text">
                    <h1>Best <span>Quality</span> Ingredients</h1>
                    <p>
                        Choosing us to give your child the best party
                    </p>
                    <div className="carousel-btn">
                        <Link className="btn custom-btn" to="/Menu">View Menu</Link>
                        <Link className="btn custom-btn" to="/Booking">Book Table</Link>
                    </div>
                </div>
            </div>
            <div className='item'>
                <div className="carousel-img">
                    <img src="/img/carousel-2.jpg" alt="Image"/>
                </div>
                <div className="carousel-text">
                    <h1>Best <span>Quality</span> Ingredients</h1>
                    <p>
                    Choosing us to give your child the best party
                    </p>
                    <div className="carousel-btn">
                        <Link className="btn custom-btn" to="/Menu">View Menu</Link>
                        <Link className="btn custom-btn" to="/Booking">Book Table</Link>
                    </div>
                </div>
            </div>
            <div className='item'>
                <div className="carousel-img">
                    <img src="/img/carousel-3.jpg" alt="Image"/>
                </div>
                <div className="carousel-text">
                    <h1>Best <span>Quality</span> Ingredients</h1>
                    <p>
                    Choosing us to give your child the best party
                    </p>
                    <div className="carousel-btn">
                        <Link className="btn custom-btn" to="/Menu">View Menu</Link>
                        <Link className="btn custom-btn" to="/Booking">Book Table</Link>
                    </div>
                </div>
            </div>

        </OwlCarousel>
    )
}

export default Carousell;
