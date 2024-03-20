import { useCallback } from "react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { GetBooking } from "../Services/ApiServices/BookingServices";
import { ChangeBookingStatusAfterPayment, CreateMomoLink } from "../Services/ApiServices/PaymentServices";
import parseJwt from "../Services/parseJwt";
import useToken from "../Services/useToken";
import NotFound from "./NotFound";


function Payment() {
    const navigate = useNavigate();
    const { payType, id } = useParams();

    const [payUrl, setPayUrl] = useState(null);
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);

    const token = useToken().token;
    let userId = null;
    if(token) userId = parseInt(parseJwt(token).nameid);

    const fetchBooking = async () => {
        const data = await GetBooking(id);
        const json = await data.json();
        setBooking(json);
        return data;
    };

    const fetchMomoUrl = async () => {
        if(!booking || !payType) {
            return;
        }
        const options = {
            message: `Payment for party booking`,
            payType: payType,
            bookingId: id,
            redirectUrl: "http://localhost:3000/payment-completed"
        }
        console.log(booking);
        const data = await CreateMomoLink(options);
        const json = await data.json();
        console.log(json);
        setPayUrl(json.url);
    };

    const fetchCashPayment = async () => {
        const options = {
            bookingId: parseInt(id),
            method: payType
        }
        const data = await ChangeBookingStatusAfterPayment(options);
        const json = await data.json();
        if(!json) {
            setError("Something went wrong");
        }
    };

    const CheckLogin = () => {
        if (!token) {
            navigate("/login");
        }
    };

    const payWithCash = () => {
        fetchCashPayment();
        navigate("/payment-completed");
    };

    const payWithMomo = () => {
        window.location.href = payUrl;
    };

    useEffect(() => {
        CheckLogin();
        fetchBooking();
    }, []);

    useEffect(() => { fetchMomoUrl(); }, [booking]);
    
    if(!payType || !id)
        return <NotFound/>

    if(!booking || !booking.user || !booking.room)
        return <NotFound/>

    return (
        <Fragment>
            <PageHeader title1="Home" title={"Payment"}/>
            <div className="container">
                <div className="text-danger">{error}</div>
                <h2 className="text-center">Choose your Payment method</h2>
                    {/*<div>{JSON.stringify(booking)}</div>*/}
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Room</th>
                          <th scope="col">Party Time</th>
                          <th scope="col">Party End Time</th>
                          <th scope="col">Services</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{booking.bookingId}</th>
                          <td>{booking.user.userName}</td>
                          <td>{booking.room.roomNumber}</td>
                          <td>{new Date(booking.partyDateTime).toLocaleString()}</td>
                          <td>{new Date(booking.partyEndTime).toLocaleString()}</td>
                          <td>{booking.bookingStatus}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h3>Services</h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Image</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                         {booking.bookingServices.map((bookingService, index) => {
                             return (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{bookingService.service.serviceName}</td>
                                    <td>{bookingService.service.servicePrice}</td>
                                    <td><img style={{width: "100px"}} src={"/img/carousel-1.jpg"}/></td>
                                    <td>{bookingService.amount}</td>
                                </tr>
                             )
                         })}
                      </tbody>
                    </table>
                    <h4 style={{textAlign: "right"}} className="text-success">Total: {booking.totalPrice+ " VND"}</h4>
                    {payType == "deposit" && 
                        <div>
                            <h5 style={{textAlign: "right"}} className="text-danger">Deposit: {booking.totalPrice*1/4 + " VND"}</h5>
                        </div>
                    }
                    <div className="d-flex justify-content-around flex-wrap mb-3">
                    <button onClick={() => payWithCash()} className="btn btn-success">
                        <i className="fa fa-dollar"></i>
                        Pay with cash
                    </button>
                    <button onClick={() => payWithMomo()} className="btn btn-primary">
                        <img src="https://developers.momo.vn/v3/img/logo.svg"/>
                        Pay with Momo
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default Payment; 
