import { useCallback } from "react";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import PageHeader from "../Components/PageHeader";
import { GetAllOngoingBookings } from "../Services/ApiServices/BookingServices";
import { ConfirmPayment } from "../Services/ApiServices/PaymentServices";

export default function HostPayment() {
    const [bookings, setBookings] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchOngoingBookings = useCallback(async () => {
        try{
            const data = await GetAllOngoingBookings();
            const json = await data.json();
            setBookings(json);
        }
        catch(err){
            setErrorMessage(err.message);
        }
    }, [])

    const fetchConfirmPayment = async (options) => {
        try{
            const data = await ConfirmPayment(options);
            const json = await data.json();
            if(!json) {
                setErrorMessage("Something went wrong");
            }
        }
        catch(err){
            setErrorMessage(err.message);
        }
    }

    const confirmPayment = async (e) => {
        const btn = e.target;
        const options = {
            bookingId: parseInt(btn.getAttribute("data-id"))
        }
        await fetchConfirmPayment(options);
        fetchOngoingBookings();
    }
    
    useEffect(() => {
        fetchOngoingBookings();
    }
    , [fetchOngoingBookings])
    

    return (
        <Fragment>
            <PageHeader title1="Host" title={"Payment"}/>
            <h2 className="host-title">Host Payment</h2>
            <div className="text-danger">{errorMessage}</div>
            <table className="table host-table container">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Room</th>
                  <th scope="col">Booking Time</th>
                  <th scope="col">Party Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">Total Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => {
                    return (
                        <tr>
                            <th scope="row">{booking.bookingId}</th>
                            <td>{booking.user.userName}</td>
                            <td>{booking.roomId}</td>
                            <td>{booking.partyDateTime}</td>
                            <td>{booking.partyEndTime}</td>
                            <td>{booking.bookingStatus}</td>
                            <td>{booking.feedback}</td>
                            <td>{booking.totalPrice+" VND"}</td>
                            <td><button data-id={booking.bookingId} onClick={(e) => confirmPayment(e)} className="btn btn-primary">Confirm Payment</button></td>
                        </tr>
                    )
                })}
              </tbody>
            </table>
        </Fragment>
    );
}
 
