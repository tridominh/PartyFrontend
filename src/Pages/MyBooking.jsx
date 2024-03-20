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
            {/* Footer Start */}
        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="footer-contact">
                                    <h2>Our Address</h2>
                                    <p><i class="fa fa-map-marker-alt"></i>FPT University HCMC</p>
                                    <p><i class="fa fa-phone-alt"></i>+098 765 4321</p>
                                    <p><i class="fa fa-envelope"></i>birthdayparty@gmail.com</p>
                                    <div class="footer-social">
                                        <a href=""><i class="fab fa-twitter"></i></a>
                                        <a href=""><i class="fab fa-facebook-f"></i></a>
                                        <a href=""><i class="fab fa-youtube"></i></a>
                                        <a href=""><i class="fab fa-instagram"></i></a>
                                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="footer-link">
                                    <h2>Quick Links</h2>
                                    <a href="">Terms of use</a>
                                    <a href="">Privacy policy</a>
                                    <a href="">Help</a>
                                    <a href="">FQAs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright">
                <div class="container">
                    <p>Copyright &copy; <a href="/">Birthday Party For Kids</a>, All Right Reserved.</p>
                </div>
            </div>
        </div>
        {/* Footer End */}
        </Fragment>  
    );
}

export default MyBooking;
