import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import useToken from '../Services/useToken';
import "../assets/css/customer-booking.css"
import {GetAllPackages} from '../Services/ApiServices/PackageServices';
import {GetAllRooms} from '../Services/ApiServices/RoomServices';
import { CreateBooking } from '../Services/ApiServices/BookingServices';
import NotFound from './NotFound';
import RoomCarousel from '../Components/RoomCarousel';
import parseJwt from '../Services/parseJwt';
import { NotificationContainer } from 'react-notifications';
import createHeaderNotification from '../Services/headerNotification';

function Booking(){
    let { id } = useParams();
    let navigate = useNavigate();

    const token = useToken().token;

    const CheckLogin = (e) =>{
        if(token != null){
        
        }else{
            navigate("/login");
        }
    };

    const [packages, setPackages] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [room, setRoom] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let userId = null;
    if(token) userId = parseInt(parseJwt(token).nameid);

    const fetchPackages = useCallback(async () => {
        const data = await GetAllPackages();
        const json = data;
        //console.log(json);
        setPackages(json);
    }, [])

    const fetchRooms = useCallback(async () => {
        const data = await GetAllRooms();
        const json = await data.json();
        //console.log(json);
        setRooms(json);
        if(json.some(room => room.roomId == id))
            setRoom(json.find(room => room.roomId == id))
    }, [])

    useEffect(() => {
        fetchRooms();
        fetchPackages();
    }, [fetchRooms, fetchPackages])

    async function createBook(booking) {
        //console.log(JSON.stringify(credentials))
        let res;
        try {
            res = await CreateBooking(booking);

            if (!res.ok) {
                const errorData = await res.text();
                throw new Error(errorData || 'Unknown error occurred');
            }

            // Handle successful response data
            setErrorMsg("");
            // const data = await res.json();
            // process the data as needed

        } catch (err) {
            setErrorMsg(err.message);
            return;
            // Handle errors
        }
        //console.log(await res.json());
        return await res.json();
    }

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const roomId = parseInt(document.getElementById("roomId").innerText);
        const partyDateTime = document.getElementById("partyDate").value;
        const partyEndTime = document.getElementById("partyEndDate").value;
        const services = document.getElementsByClassName("service-select");
        const amounts = document.getElementsByClassName("service-amount");
        let serviceIds = [];
        for(let i=0; i<services.length; i++) {
            if(services[i].value == "") continue;
            console.log(amounts[i])
            let serviceId = {
                serviceId: parseInt(services[i].value),
                amount: parseInt(amounts[i].value)
            }
            serviceIds.push(serviceId);
        }
        const booking = {
            userId: userId,
            roomId: roomId,
            partyDateTime: partyDateTime,
            partyEndTime: partyEndTime,
            bookingStatus: "Pending",
            feedback: "",
            serviceIds: serviceIds
        };

        //console.log(booking);
        const book = await createBook(booking);
        console.log(book);
        console.log(errorMsg);
        if(book != undefined){
            createHeaderNotification("success", "Create booking successfully", "Success");
            //navigate("/payment");
        }
    };

    useEffect(() => {
        if(errorMsg != "")
            createHeaderNotification("error", errorMsg ,"Error");
    }, [errorMsg])

    if(!rooms || !packages) 
        return (<Fragment>
                <PageHeader title={"Booking"}/>
                <div>Loading...</div>
            </Fragment>
        );
    else if(!rooms.some(room => room.roomId == id))
        return (<NotFound/>);
        
    return( 
    <Fragment>
    <PageHeader title={"Booking"}/>
    <div className="booking">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="booking-content">
                        <div className="section-header">
                            <p>Book A Table</p>
                            <h2>Book Table For Your Kids</h2>
                        </div>
                        <RoomCarousel room={room}/>
                        <div className="about-text">
                            <p>
                            Create an unforgettable birthday party experience for children, full of joy and cherished memories. Our Birthday Party Booking service for kids aims to provide a magical celebration customized to the interests and desires of the child. We aim to make your child's special day even more special.
                            </p>
                            <p>
                            Let us take care of the planning and organization, while you enjoy seeing the happy faces of your child shining with joy amidst the fun with friends and family.                                </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="booking-form">
                        <form onSubmit={e =>handleBookingSubmit(e)}>
                            
                            <div className="control-group row">
                                <label className='col-3 booking-label'>Room</label>
                                <div className="col-9 input-group">
                                    <strong id="roomId" className='text-white'>{room.roomId}</strong>
        {/*<div className="input-group-append">
                                        <div className="input-group-text"><i className="far fa-envelope"></i></div>
                                    </div>*/}
                                </div>
                            </div>
                            <div className="control-group row">
                                <label className='col-3 booking-label'>Party Time</label>
                                <div className="col-9 input-group date" id="date" data-target-input="nearest">
                                    <input id='partyDate' type="datetime-local" className="form-control" placeholder="Date"/>
        {/*<div className="input-group-append">
                                        <div className="input-group-text"><i className="far fa-calendar-alt"></i></div>
                                    </div>*/}
                                </div>
                            </div>
                            <div className="control-group row">
                                <label className='col-3 booking-label'>Party End Time</label>
                                <div className="col-9 input-group date" id="date" data-target-input="nearest">
                                    <input id='partyEndDate' type="datetime-local" className="form-control" placeholder="Date"/>
        {/*<div className="input-group-append">
                                        <div className="input-group-text"><i className="far fa-calendar-alt"></i></div>
                                    </div>*/}
                                </div>
                            </div>
                            <h5 className='text-white'>Package</h5>
                            {packages.map(el => {
                                return (<div className="control-group row">
                                    <label className='col-3 booking-label'>{el.packageName}</label>
                                    <div className="col-6 input-group">
                                        <select className="service-select form-control" aria-label="Default select example">
                                            <option value={""} selected>None</option>
                                            {el.services && el.services.map((service, i) => {
                                                return (<option value={service.serviceId}>{service.serviceName}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <label className='col-1 booking-label'> x </label>
                                    <input type="number" className="service-amount col-2 form-control"/>
                                </div>)
                            })}
                            <div>
                                <button className="btn custom-btn" type="submit" onClick={e => CheckLogin(e)}>Book Now</button>
                            </div>
                            <span className='text-danger'>{errorMsg}</span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <NotificationContainer/>
    </Fragment>
    );
}

export default Booking;
