import { Fragment, useState } from "react";
import PageHeader from "../Components/PageHeader";

export default function HostPayment() {
    const [bookings, setBookings] = useState(null);
    return (
        <Fragment>
            <PageHeader title1="Host" title={"Payment"}/>
            <div>Payment</div>
        </Fragment>
    );
}
 
