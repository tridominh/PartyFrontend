import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import RoomCarousel from '../Components/RoomCarousel';
import {GetAllRooms} from '../Services/ApiServices/RoomServices';
import useToken from '../Services/useToken';
import './room.css';

function Room(){
    let navigate = useNavigate();

    const CheckLogin = () =>{
        if(useToken().token != null){
        
        }else{
            navigate("/login");
        }
    };

    const [filterPrice, setFilterPrice] = useState(null);
    const handleFilterPrice = (event) => {
        const value = event.target.value;
        setFilterPrice(value);
    };
    const filterRoomsByPrice = (rooms, filterPrice) => {
        if (!filterPrice) {
            return rooms;
        }
    
        return rooms.filter(room => room.price <= filterPrice);
    };
    
    

    const [rooms, setRooms] = useState(null);


    const fetchData = useCallback(async () => {
        const data = await GetAllRooms();
        const json = await data.json();
        console.log(json);
    
        let filteredRooms = json;
    
        if (filterPrice) {
            filteredRooms = json.filter(room => room.price <= filterPrice);
        }
    
        setRooms(filteredRooms);
    }, [filterPrice]);

    useEffect(() => {
        fetchData();
    }, [fetchData])


    if(!rooms) return (
        <Fragment>
            <PageHeader title={"Room"}/>
            <div>Loading...</div>
        </Fragment>
    )

    return( 
        <Fragment>
            <PageHeader title={"Room"}/>
            {/*<div>{JSON.stringify(rooms)}</div>*/}
            <div className="filter-container">
                <br></br>
            <label htmlFor="priceFilter">Filter by Price:</label>
            <select id="priceFilter" onChange={handleFilterPrice}>
                <option value="">All</option>
                <option value="100">Less than 100 VND</option>
                <option value="200">Less than 200 VND</option>
                <option value="300">Less than 300 VND</option>
                <option value="500">Less than 500 VND</option>
            </select>
        </div>
            <div className="food row align-items-center">
                {rooms.map(room => {
                    return (
                        <div className="col-md-4">
                            <div className="food-item">
                                {/* <i className="flaticon-burger"></i> */}
                                {/*<img src='data:image/jpeg;base64,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'/>*/}
                                <RoomCarousel room={room}/>
                                <h2>{room.roomNumber}</h2>
                                <strong className='room-price-text'>{`Price: ${room.price} VND`}</strong>
                                <div className='room-price-text'>{`Status: ${room.roomStatus}`}</div>
                                <p>
                                The menu will include mainly vegetables, mushrooms, kimchi, tofu and beans.                            </p>
                                <Link className='room-book-btn' to={`/Booking/${room.roomId}`}>Book Now!!!</Link>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </Fragment>
    );
}

export default Room; 
