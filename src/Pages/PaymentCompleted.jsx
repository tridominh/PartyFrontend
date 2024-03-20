import { Fragment } from "react";
import PageHeader from "../Components/PageHeader";


function PaymentComplete() {

    

    return (
        <Fragment>
            <PageHeader title1="Payment" title={"Completed"}/>
            <h3 className="text-center">Your payment has been completed</h3>
        </Fragment>
    );
}

export default PaymentComplete;