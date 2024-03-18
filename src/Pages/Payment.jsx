import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { ChangeBookingStatusAfterPayment, CreateMomoLink } from "../Services/ApiServices/PaymentServices";
import parseJwt from "../Services/parseJwt";
import useToken from "../Services/useToken";
import NotFound from "./NotFound";


function Payment() {
    const navigate = useNavigate();
    const { payType, id } = useParams();

    const [payUrl, setPayUrl] = useState(null);
    const [error, setError] = useState(null);

    const token = useToken().token;
    let userId = null;
    if(token) userId = parseInt(parseJwt(token).nameid);

    const fetchMomoUrl = async () => {
        const options = {
            message: "Hello",
            bookingId: id,
        }
        const data = await CreateMomoLink(options);
        const json = await data.json();
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
        fetchMomoUrl();
    }, []);
    
    if(!payType || !id)
        return <NotFound/>

    return (
        <Fragment>
            <PageHeader title1="Home" title={"Payment"}/>
            <div className="container">
                <h2 className="text-center">Choose your Payment method</h2>
                    <div className="d-flex justify-content-around flex-wrap">
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
