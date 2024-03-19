import { Fragment, useState, useEffect, useCallback } from "react";
import { NotificationContainer } from "react-notifications";
import { useNavigate } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { GetAllBookingsByUserId, GetAllOngoingBookingsByUserId } from "../Services/ApiServices/BookingServices";
import parseJwt from "../Services/parseJwt";
import useToken from "../Services/useToken";

function MyBooking() {
    const navigate = useNavigate();
    const token = useToken().token;
    const [bookings, setBookings] = useState(null);
    const [onGoing, setOnGoing] = useState([]);
    const [outdatedAndRejeted, setOutdatedAndRejected] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const CheckLogin = () => {
        if (!token) {
            navigate("/login");
        }
    };

    useEffect(() => CheckLogin(), [])

    let userId = null;
    if(token) userId = parseInt(parseJwt(token).nameid);

    const fetchBookings = useCallback(async () => {
        const data = await GetAllBookingsByUserId(userId);
        const json = await data.json();
        setBookings(json);
    }, [])

    const payFullPrice = (e) => {
        e.preventDefault();
        navigate("/payment");
    };

    const payDeposit = (e) => {
        e.preventDefault();
        navigate("/payment");
    };

    useEffect(() => {
        fetchBookings();
        bookings && setOnGoing(
            bookings.filter(booking => booking.bookingStatus == "Accepted" && 
                new Date(booking.partyDateTime) >= new Date()));
        bookings && setOutdatedAndRejected(
            bookings.filter(booking => (booking.bookingStatus == "Accepted" && 
                new Date(booking.partyDateTime) < new Date()) ||
                booking.bookingStatus == "Rejected"));

    }
    , [fetchBookings, bookings])

    if(!bookings) 
    return (
        <Fragment>
            <PageHeader title1="Home" title={"My Booking"}/>
            <div>Loading...</div>
        </Fragment>
    );

    return (
        <Fragment>
            <PageHeader title1="Home" title={"My Booking"}/>
            {/*<div>{JSON.stringify(bookings)}</div>*/}
            <h2 className="host-title">Host Booking</h2>
            <div className="container">
                <h3 className="text-primary">Ongoing</h3>
                <table className="table host-table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User</th>
                      <th scope="col">Room</th>
                      <th scope="col">Booking Time</th>
                      <th scope="col">Party Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Feedback</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {onGoing.map(booking => {
                       return (<tr>
                          <th scope="row">{booking.bookingId}</th>
                          <td>{booking.userId}</td>
                          <td>{booking.roomId}</td>
                          <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                          <td>{new Date(booking.partyDateTime).toLocaleString()}</td>
                          <td>{booking.bookingStatus}</td>
                          <td>{booking.feedback}</td>
                          <td><button onClick={(e) => payFullPrice(e)} data-id={booking.bookingId} className="btn btn-success">Pay now!!!</button></td>
                          <td><button onClick={(e) => payDeposit(e)} data-id={booking.bookingId} className="btn btn-danger">Pay deposit</button></td>
                        </tr>)
                    })}
                  </tbody>
                </table>
                <h3 className="text-danger">Outdated and Rejected</h3>
                <table className="table host-table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User</th>
                      <th scope="col">Room</th>
                      <th scope="col">Booking Time</th>
                      <th scope="col">Party Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outdatedAndRejeted.map(booking => {
                       return (<tr>
                          <th scope="row">{booking.bookingId}</th>
                          <td>{booking.userId}</td>
                          <td>{booking.roomId}</td>
                          <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                          <td>{new Date(booking.partyDateTime).toLocaleString()}</td>
                          <td>{booking.bookingStatus}</td>
                          <td>{booking.feedback}</td>
                        </tr>)
                    })}
                  </tbody>
                </table>
                <NotificationContainer/>
                <div className="text-danger">{errorMessage}</div>
            </div>
        </Fragment>  
    );
}

export default MyBooking;
