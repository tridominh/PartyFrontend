import React, { Fragment } from "react";
import PageHeader from "../Components/PageHeader";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

export default function About() {
    return (
        <Fragment>
            <PageHeader title1="About" title={"Birthday Booking"} />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2 className="text-center">About Description</h2>
                        <p>
                            Welcome to our Birthday Party Booking Website. Here,
                            we introduce interesting services and packages for
                            amazing birthday booking for your children
                        </p>
                    </div>
                </div>
            </div>

            <Contact />

            <Footer />
        </Fragment>
    );
}
