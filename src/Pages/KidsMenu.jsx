import React, {Fragment} from 'react'
import PageHeader from "../Components/PageHeader";
import "../assets/css/kidsMenu.css";
import {Link} from "react-router-dom";
export default function KidsMenu() {

    return (
        <Fragment>
            <PageHeader title={"KidsMenu"}/>
            <div className="menu">
                <h1>KidsMenu</h1>
                <ul>
                    <li>Pizza</li>
                    <li>Hamburgers</li>
                    <li>Snacks</li>
                    <li>Soft Drinks</li>
                    <li>Fruit Drinks</li>
                </ul>
                <Link to="/booking" className="booking-btn">Booking Now</Link>
            </div>
        </Fragment>
    )
}
