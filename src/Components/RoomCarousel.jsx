import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//import './carousel.css';
import { Link } from 'react-router-dom';
import "./room-carousel.css";
import { useEffect } from 'react';

function RoomCarousel({ room }){
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
        },
    };

    //useEffect(() => console.log(room.roomImages), [])

    if(!room) return (<div>No Room</div>)

    return (
        <OwlCarousel className='owl-theme room-owl-carousel' {...options}>
            {room.roomImages.length>0 && (room.roomImages.map(roomImg => {
               return (<div className='item room-item'>
                    <div className="room-carousel-img">
                        <img src={`data:image/bmp;base64,${roomImg.image}`} alt="Image"/>
                    </div>
               </div>)
            }))}  
            {room.roomImages.length<=0 && (
                <><div className='item room-item'>
                    <div className="room-carousel-img">
                        <img src="/img/carousel-1.jpg" alt="Image"/>
                    </div>
                </div>
                <div className='item room-item'>
                    <div className="room-carousel-img">
                        <img src="/img/carousel-1.jpg" alt="Image"/>
                    </div>
                </div></>
            )}
        </OwlCarousel>
    )
}

export default RoomCarousel;