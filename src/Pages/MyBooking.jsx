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
    const [bookings, setBookings] = useState([]);
    const [onGoing, setOnGoing] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [outdatedAndRejeted, setOutdatedAndRejected] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    let userId = null;
    if(token) userId = parseInt(parseJwt(token).nameid);

    const fetchBookings = async () => {
        const data = await GetAllBookingsByUserId(userId);
        const json = await data.json();
        setBookings(json);
    }

    const CheckLogin = () => {
        if (!token) {
            navigate("/login");
        }
    };

    const payFullPrice = (e) => {
        e.preventDefault();
        const button = e.target;
        const id = button.getAttribute("data-id");
        navigate(`/payment/fullprice/${id}`);
    };

    const payDeposit = (e) => {
        e.preventDefault();
        const button = e.target;
        const id = button.getAttribute("data-id");
        navigate(`/payment/deposit/${id}`);
    };


    useEffect(() => CheckLogin(), [])

    useEffect(() => {
        fetchBookings();
    }
    , [])

    useEffect(() => {
        setOnGoing(
            bookings.filter(booking => (booking.bookingStatus == "Accepted" ||
                booking.bookingStatus == "Pending" ||
                booking.bookingStatus == "DepositPaying" ||
                booking.bookingStatus == "Deposit" ||
                booking.bookingStatus == "FullPaying") && 
                new Date(booking.partyDateTime) >= new Date()));
        setCompleted(
            bookings.filter(booking => booking.bookingStatus == "Paid")
        )
        setOutdatedAndRejected(
            bookings.filter(booking => (booking.bookingStatus != "Paid") &&
                new Date(booking.partyDateTime) < new Date())
        )
    }
    , [bookings])


    if(bookings.length == 0) 
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
                      <th scope="col">Name</th>
                      <th scope="col">Room</th>
                      <th scope="col">Party Time</th>
                      <th scope="col">Party End Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total Price</th>
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
                          <td>{new Date(booking.partyDateTime).toLocaleString()}</td>
                          <td>{new Date(booking.partyEndTime).toLocaleString()}</td>
                          <td>{booking.bookingStatus}</td>
                          <td>{booking.totalPrice}</td>
                          <td>{(booking.bookingStatus == "Accepted" || booking.bookingStatus == "Deposit") && <button onClick={(e) => payFullPrice(e)} data-id={booking.bookingId} className="btn btn-success">Pay now!!!</button>}</td>
                          <td>{(booking.bookingStatus == "Accepted" || booking.bookingStatus == "Deposit") && <button onClick={(e) => payDeposit(e)} data-id={booking.bookingId} className="btn btn-danger">Pay deposit</button>}</td>
                        </tr>)
                    })}
                  </tbody>
                </table>
                <h3 className="text-success">Completed</h3>
                <table className="table host-table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Room</th>
                      <th scope="col">Party Time</th>
                      <th scope="col">Party End Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completed.map(booking => {
                       return (<tr>
                          <th scope="row">{booking.bookingId}</th>
                          <td>{booking.userId}</td>
                          <td>{booking.roomId}</td>
                          <td>{new Date(booking.partyDateTime).toLocaleString()}</td>
                          <td>{new Date(booking.partyEndTime).toLocaleString()}</td>
                          <td>{booking.bookingStatus}</td>
                          <td>{booking.totalPrice}</td>
                        </tr>)
                    })}
                  </tbody>
                </table>
                <h3 className="text-danger">Outdated and Rejected</h3>
                <table className="table host-table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Room</th>
                      <th scope="col">Party Time</th>
                      <th scope="col">Party End Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outdatedAndRejeted.map(booking => {
                       return (<tr>
                          <th scope="row">{booking.bookingId}</th>
                          <td>{booking.userId}</td>
                          <td>{booking.roomId}</td>
                          <td>{new Date(booking.partyDateTime).toLocaleString()}</td>
                          <td>{new Date(booking.partyEndTime).toLocaleString()}</td>
                          <td>{booking.bookingStatus}</td>
                          <td>{booking.totalPrice}</td>
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
