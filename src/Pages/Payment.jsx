import { Fragment, useState } from "react";
import PageHeader from "../Components/PageHeader";


function Payment() {
    
    const [payUrl, setPayUrl] = useState(null);

    

    return (
        <Fragment>
            <PageHeader title1="Home" title={"Payment"}/>
            <div className="container">
                <h2 className="text-center">Choose your Payment method</h2>
                    <div className="d-flex justify-content-around flex-wrap">
                    <button className="btn btn-success">
                        <i className="fa fa-dollar"></i>
                        Pay with cash
                    </button>
                    <button className="btn btn-primary">
                        <img src="https://developers.momo.vn/v3/img/logo.svg"/>
                        Pay with Momo
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default Payment;
