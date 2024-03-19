import React, { Fragment, useCallback, useEffect, useState } from "react";
import PageHeader from "../Components/PageHeader";
import { GetAllBookings, GetAllPendingBookings, UpdateStatusBooking } from "../Services/ApiServices/BookingServices";
import "../assets/css/confirm-booking.css";
import { useNavigate } from "react-router-dom";
import createHeaderNotification from "../Services/headerNotification.js";
import { NotificationManager } from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

export default function ConfirmBooking() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchBookings = useCallback(async () => {
        const data = await GetAllPendingBookings();
        const json = await data.json();
        //console.log(json);
        setBookings(json);
    }, [])

    const fetchUpdateBookings = useCallback(async (booking) => {
        let res;
        try{
            res = await UpdateStatusBooking(booking);
            if(!res.ok){
                const errorData = await res.text();
                throw new Error(errorData || "Unknown error occurred");
            }
            
        }
        catch (err){
            setErrorMessage(err.message);
            return;
        }
        return await res.json();
    }, [])


    useEffect(() => {
        fetchBookings();
    }
    , [fetchBookings])
    

    if(!bookings) return (
        <Fragment>
            <PageHeader title1="Host" title={"Confirm Booking"}/>
            <div>Loading...</div>
        </Fragment>
    );

    async function confirmBooking(e){
        const button = e.target;
        const id = button.getAttribute("data-id");
        const booking = {
            bookingId : id,
            status : "Accepted"
        };
        if(booking) 
            createHeaderNotification("success", "Confirm successfully", "Success");
        await fetchUpdateBookings(booking);
        fetchBookings();
    }

    async function rejectBooking(e){
        const button = e.target;
        const id = button.getAttribute("data-id");
        const booking = {
            bookingId : id,
            status : "Rejected"
        };
        if(booking) 
            createHeaderNotification("error", "Reject successfully", "Success");
        await fetchUpdateBookings(booking);
        fetchBookings();
    }

    return (
     <Fragment>
        <PageHeader title1="Host" title={"Confirm Booking"}/>
        <h2 className="host-title">Host Booking</h2>
        {/*<div>{JSON.stringify(bookings)}</div>*/}
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
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => {
               return (<tr>
                  <th scope="row">{booking.bookingId}</th>
                  <td>{booking.userId}</td>
                  <td>{booking.roomId}</td>
                  <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                  <td>{new Date(booking.partyDateTime).toLocaleString()}</td>
                  <td>{booking.bookingStatus}</td>
                  <td>{booking.feedback}</td>
                  <td><button onClick={(e) => confirmBooking(e)} data-id={booking.bookingId} className="btn btn-success">Confirm</button></td>
                  <td><button onClick={(e) => rejectBooking(e)} data-id={booking.bookingId} className="btn btn-danger">Reject</button></td>
                </tr>)
            })}
          </tbody>
        </table>
        <NotificationContainer/>
        <div className="text-danger">{errorMessage}</div>
    </Fragment>  );
}
