import { Fragment } from "react";
import Carousell from "./Carousel";
import "./carousel.css";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/home.css";
import useToken from "../Services/useToken";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";

function Home() {
    let navigate = useNavigate();
    const CheckLogin = () => {
        if (useToken().token != null) {
        } else {
            navigate("/login");
        }
    };

    return (
        <Fragment>
            <Carousell />
            {/*  Booking Start */}
            <div className="booking">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="booking-content">
                                <div className="section-header">
                                    <p>Book A Table</p>
                                    <h2>Book Table For Your Kids</h2>
                                </div>
                                <div className="about-text">
                                    <p>
                                        Create an unforgettable birthday party
                                        experience for children, full of joy and
                                        cherished memories. Our Birthday Party
                                        Booking service for kids aims to provide
                                        a magical celebration customized to the
                                        interests and desires of the child. We
                                        aim to make your child's special day
                                        even more special.
                                    </p>
                                    <p>
                                        Let us take care of the planning and
                                        organization, while you enjoy seeing the
                                        happy faces of your child shining with
                                        joy amidst the fun with friends and
                                        family.{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="booking-form">
                                <form>
                                    <div className="control-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                required="required"
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <i className="far fa-user"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                required="required"
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <i className="far fa-envelope"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Mobile"
                                                required="required"
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <i className="fa fa-mobile-alt"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div
                                            className="input-group date"
                                            id="date"
                                            data-target-input="nearest"
                                        >
                                            <input
                                                type="text"
                                                className="form-control datetimepicker-input"
                                                placeholder="Date"
                                                data-target="#date"
                                                data-toggle="datetimepicker"
                                            />
                                            <div
                                                className="input-group-append"
                                                data-target="#date"
                                                data-toggle="datetimepicker"
                                            >
                                                <div className="input-group-text">
                                                    <i className="far fa-calendar-alt"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div
                                            className="input-group time"
                                            id="time"
                                            data-target-input="nearest"
                                        >
                                            <input
                                                type="text"
                                                className="form-control datetimepicker-input"
                                                placeholder="Time"
                                                data-target="#time"
                                                data-toggle="datetimepicker"
                                            />
                                            <div
                                                className="input-group-append"
                                                data-target="#time"
                                                data-toggle="datetimepicker"
                                            >
                                                <div className="input-group-text">
                                                    <i className="far fa-clock"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="custom-select form-control"
                                                placeholder="Amount"
                                                required="required"
                                            ></input>
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <i className="far fa-user"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="btn custom-btn"
                                            type="submit"
                                            onClick={CheckLogin}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Booking End */}

            {/*  Video Modal Start*/}
            <div
                className="modal fade"
                id="videoModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {/*  16:9 aspect ratio */}
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    src=""
                                    id="video"
                                    allowscriptaccess="always"
                                    allow="autoplay"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Video Modal End */}

            {/*  Feature Start */}
            <div className="feature">
                <div className="container">
                    <div className="row row-2">
                        <div
                            className="col-lg-5"
                            style={{ position: "relative", top: "-39px" }}
                        >
                            <div className="section-header">
                                <p
                                    style={{
                                        fontSize: "25px",
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Why Choose Us
                                </p>
                            </div>
                            <div className="feature-text">
                                <div className="feature-img">
                                    <div className="row">
                                        <div className="col-6">
                                            <img
                                                src="img/feature-1.jpg"
                                                alt="Image"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <img
                                                src="img/feature-2.jpg"
                                                alt="Image"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <img
                                                src="img/feature-3.jpg"
                                                alt="Image"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <img
                                                src="img/feature-4.jpg"
                                                alt="Image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-7"
                            style={{ position: "relative", top: "47px" }}
                        >
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="feature-item">
                                        <i className="flaticon-cooking"></i>
                                        <h3>World’s best Chef</h3>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="feature-item">
                                        <i className="flaticon-vegetable"></i>
                                        <h3>Natural ingredients</h3>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="feature-item">
                                        <i className="flaticon-medal"></i>
                                        <h3>Best quality products</h3>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="feature-item">
                                        <i className="flaticon-meat"></i>
                                        <h3>Fresh vegetables & Meet</h3>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Feature End */}

            {/*  Food Start */}
            <div className="food" style={{ padding: "50px", margin: "0px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <div className="food-item">
                                {/* <i className="flaticon-burger"></i> */}
                                <svg
                                    viewBox="0 0 1024 1024"
                                    class="icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M618.666667 149.333333c-74.666667-2.133333-55.466667-64-106.666667-64s-32 61.866667-106.666667 64c-61.866667 2.133333-85.333333 106.666667-85.333333 106.666667l192 490.666667 192-490.666667s-23.466667-104.533333-85.333333-106.666667z"
                                            fill="#689F38"
                                        ></path>
                                        <path
                                            d="M426.666667 960c-8.533333-49.066667 23.466667-91.733333-19.2-117.333333-21.333333-12.8-46.933333-17.066667-66.133334-32-32-21.333333-23.466667-78.933333-32-117.333334-2.133333-6.4-4.266667-14.933333-8.533333-19.2-8.533333-10.666667-46.933333-27.733333-59.733333-32-25.6-4.266667-42.666667-23.466667-49.066667-44.8-6.4-23.466667 2.133333-49.066667 0-72.533333 0-29.866667 8.533333-38.4-12.8-59.733333-14.933333-12.8-32-21.333333-42.666667-38.4-19.2-29.866667-6.4-85.333333 25.6-102.4 17.066667-8.533333 38.4-10.666667 51.2-49.066667 10.666667-34.133333 10.666667-44.8 21.333334-78.933333 8.533333-27.733333 36.266667-46.933333 64-49.066667s55.466667 14.933333 64 42.666667c12.8 38.4 6.4 36.266667 21.333333 64 17.066667 32 83.2 40.533333 85.333333 106.666666 0 23.466667-32 57.6-23.466666 76.8 4.266667 8.533333 12.8 14.933333 21.333333 23.466667 21.333333 21.333333 32 53.333333 27.733333 83.2-2.133333 17.066667-10.666667 34.133333-12.8 53.333333-2.133333 38.4 27.733333 68.266667 51.2 100.266667 55.466667 74.666667 21.333333 132.266667 21.333334 260.266667 0 2.133333-128 2.133333-128 2.133333z"
                                            fill="#8BC34A"
                                        ></path>
                                        <path
                                            d="M554.666667 960c8.533333-49.066667 19.2-91.733333 61.866666-117.333333 21.333333-12.8 46.933333-17.066667 66.133334-32 32-21.333333 23.466667-78.933333 32-117.333334 2.133333-6.4 4.266667-14.933333 8.533333-19.2 8.533333-10.666667 46.933333-27.733333 59.733333-32 21.333333-6.4 40.533333-23.466667 46.933334-44.8 6.4-23.466667-2.133333-49.066667 0-72.533333 0-29.866667-8.533333-38.4 12.8-59.733333 14.933333-12.8 32-21.333333 42.666666-38.4 19.2-29.866667 6.4-85.333333-25.6-102.4-17.066667-8.533333-38.4-21.333333-51.2-49.066667-14.933333-32-10.666667-44.8-21.333333-78.933333-8.533333-27.733333-36.266667-46.933333-64-49.066667-27.733333-2.133333-55.466667 14.933333-64 42.666667-12.8 38.4-6.4 36.266667-21.333333 64-17.066667 32-83.2 40.533333-85.333334 106.666666 0 23.466667 32 57.6 23.466667 76.8-4.266667 8.533333-12.8 14.933333-21.333333 23.466667-21.333333 21.333333-32 53.333333-27.733334 83.2 2.133333 17.066667 10.666667 34.133333 12.8 53.333333 2.133333 38.4-27.733333 68.266667-51.2 100.266667-55.466667 74.666667-64 132.266667-64 260.266667 2.133333 2.133333 130.133333 2.133333 130.133334 2.133333z"
                                            fill="#8BC34A"
                                        ></path>
                                        <path
                                            d="M618.666667 149.333333c-59.733333-2.133333-59.733333-42.666667-83.2-57.6 19.2 98.133333 81.066667 89.6 76.8 121.6-2.133333 8.533333-2.133333 12.8-8.533334 23.466667-2.133333 2.133333-12.8 10.666667-19.2 14.933333-25.6 17.066667-68.266667 46.933333-70.4 110.933334v0c-2.133333-64-44.8-91.733333-70.4-110.933334-6.4-4.266667-17.066667-10.666667-19.2-14.933333-6.4-10.666667-8.533333-12.8-8.533333-23.466667-2.133333-34.133333 53.333333-23.466667 76.8-121.6C465.066667 106.666667 465.066667 147.2 405.333333 149.333333c-21.333333 0-36.266667 12.8-49.066666 27.733334 2.133333 4.266667 4.266667 10.666667 6.4 14.933333 12.8 38.4 6.4 36.266667 21.333333 64 17.066667 32 83.2 40.533333 85.333333 106.666667 0 23.466667-32 57.6-23.466666 76.8 4.266667 8.533333 12.8 14.933333 21.333333 23.466666 21.333333 21.333333 32 53.333333 27.733333 83.2-2.133333 17.066667-10.666667 34.133333-12.8 53.333334 0 12.8 2.133333 23.466667 6.4 34.133333-72.533333 74.666667-61.866667 228.266667-59.733333 238.933333 4.266667-72.533333 21.333333-117.333333 61.866667-172.8 6.4-8.533333 14.933333-17.066667 21.333333-27.733333 17.066667-21.333333 32-44.8 29.866667-72.533333 0-19.2-8.533333-36.266667-12.8-53.333334-4.266667-29.866667 4.266667-61.866667 27.733333-83.2 6.4-6.4 17.066667-12.8 21.333333-23.466666 8.533333-21.333333-23.466667-55.466667-23.466666-76.8 2.133333-66.133333 68.266667-74.666667 85.333333-106.666667 14.933333-27.733333 8.533333-27.733333 21.333333-64 2.133333-4.266667 4.266667-10.666667 6.4-14.933333C654.933333 162.133333 640 149.333333 618.666667 149.333333z m-91.733334 283.733334c-6.4 6.4-10.666667 10.666667-14.933333 17.066666-4.266667-6.4-10.666667-12.8-14.933333-17.066666L490.666667 426.666667c2.133333-4.266667 4.266667-6.4 4.266666-10.666667 8.533333-14.933333 17.066667-32 17.066667-51.2 0 19.2 8.533333 36.266667 17.066667 51.2 2.133333 2.133333 4.266667 6.4 4.266666 10.666667l-6.4 6.4z"
                                            fill="#558B2F"
                                        ></path>
                                        <path
                                            d="M428.8 785.066667c-2.133333-4.266667-4.266667-6.4-6.4-10.666667-8.533333-17.066667-19.2-34.133333-29.866667-51.2-10.666667-17.066667-21.333333-36.266667-32-55.466667-10.666667-19.2-21.333333-38.4-29.866666-57.6-8.533333-19.2-19.2-38.4-25.6-57.6-8.533333-19.2-12.8-38.4-17.066667-55.466666-4.266667-17.066667-6.4-36.266667-8.533333-51.2-2.133333-17.066667-2.133333-32-2.133334-44.8-2.133333-12.8 2.133333-23.466667 2.133334-34.133334 2.133333-19.2 2.133333-29.866667 2.133333-29.866666s0 10.666667 2.133333 29.866666c0 8.533333 0 21.333333 2.133334 32 2.133333 12.8 4.266667 27.733333 8.533333 42.666667s8.533333 32 14.933333 49.066667c6.4 17.066667 12.8 34.133333 23.466667 51.2 8.533333 17.066667 19.2 34.133333 29.866667 51.2 10.666667 17.066667 23.466667 34.133333 36.266666 51.2 12.8 17.066667 25.6 34.133333 38.4 49.066666 4.266667 4.266667 6.4 8.533333 10.666667 12.8-2.133333 8.533333-6.4 19.2-8.533333 27.733334v8.533333c-2.133333 4.266667-2.133333 10.666667-2.133334 14.933333 0 6.4-2.133333 12.8-2.133333 19.2-4.266667 2.133333-4.266667 6.4-6.4 8.533334zM533.333333 960s0-10.666667-2.133333-29.866667c-2.133333-10.666667 0-17.066667 2.133333-27.733333 0-8.533333 2.133333-21.333333 6.4-36.266667 2.133333-6.4 4.266667-14.933333 6.4-21.333333 2.133333-6.4 4.266667-14.933333 8.533334-23.466667 6.4-14.933333 14.933333-32 23.466666-49.066666 8.533333-17.066667 19.2-34.133333 29.866667-51.2 10.666667-17.066667 21.333333-36.266667 32-55.466667 10.666667-19.2 21.333333-38.4 29.866667-57.6 8.533333-19.2 19.2-38.4 25.6-57.6 8.533333-19.2 12.8-38.4 17.066666-55.466667 4.266667-17.066667 6.4-36.266667 8.533334-51.2 2.133333-17.066667 2.133333-29.866667 2.133333-44.8 2.133333-12.8-2.133333-23.466667-2.133333-34.133333-2.133333-19.2-2.133333-29.866667-2.133334-29.866667s0 10.666667-2.133333 29.866667c0 8.533333 0 21.333333-2.133333 32-2.133333 12.8-4.266667 27.733333-8.533334 42.666667s-8.533333 32-14.933333 49.066666c-6.4 17.066667-12.8 34.133333-23.466667 51.2-8.533333 17.066667-19.2 34.133333-29.866666 51.2-10.666667 17.066667-23.466667 34.133333-36.266667 51.2-12.8 17.066667-25.6 34.133333-38.4 49.066667-12.8 17.066667-25.6 32-38.4 49.066667-12.8 17.066667-23.466667 34.133333-32 51.2l-12.8 25.6c-4.266667 8.533333-8.533333 17.066667-10.666667 25.6-6.4 17.066667-12.8 32-14.933333 46.933333-4.266667 14.933333-6.4 29.866667-6.4 38.4V960h85.333333z"
                                            fill="#DCEDC8"
                                        ></path>
                                    </g>
                                </svg>
                                <h2>Vegetarian Menu</h2>
                                <p>
                                    The menu will include mainly vegetables,
                                    mushrooms, kimchi, tofu and beans.{" "}
                                </p>
                                <a href="">View Menu</a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="food-item">
                                {/* <i className="flaticon-snack"></i> */}
                                <svg
                                    viewBox="0 0 1024 1024"
                                    class="icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M767.018667 171.648a53.418667 53.418667 0 0 0-68.138667-41.386667 52.48 52.48 0 0 0-35.477333 36.117334 54.613333 54.613333 0 0 0-1.642667 21.589333 80.106667 80.106667 0 0 1-22.976 66.666667l-117.397333 117.397333 45.248 45.248 117.397333-117.397333a80.192 80.192 0 0 1 66.688-22.976c6.848 0.874667 14.101333 0.405333 21.546667-1.642667a52.48 52.48 0 0 0 36.138666-35.477333 53.418667 53.418667 0 0 0-41.386666-68.138667zM937.322667 342.272c2.709333-12.202667 2.048-25.642667-8.832-41.002667-9.578667-13.504-24.725333-23.338667-41.301334-23.914666A53.333333 53.333333 0 0 0 832 330.666667v0.384c0.170667 22.549333-10.474667 43.754667-30.656 53.845333l-154.325333 77.162667 28.629333 57.258666 167.296-83.648c18.496-9.258667 39.786667-6.272 57.408 4.565334a53.589333 53.589333 0 0 0 43.733333 5.44 52.16 52.16 0 0 0 34.922667-34.965334 53.418667 53.418667 0 0 0-41.685333-68.437333z"
                                            fill="#D7CCC8"
                                        ></path>
                                        <path
                                            d="M661.333333 405.333333c0-67.306667 22.698667-105.450667 22.698667-105.450666l-45.248-45.248C581.162667 312.256 384 298.666667 384 298.666667l277.333333 106.666666z"
                                            fill="#BF360C"
                                        ></path>
                                        <path
                                            d="M42.666667 768s147.093333 128 384 128 426.666667-137.344 426.666666-256-170.666667-234.666667-170.666666-234.666667-173.76-106.666667-298.666667-106.666666C42.645333 298.666667 42.666667 768 42.666667 768z"
                                            fill="#E64A19"
                                        ></path>
                                        <path
                                            d="M839.189333 578.389333c-14.954667-34.56-39.850667-66.944-65.621333-94.229333C608.405333 504.32 320 597.333333 320 597.333333s53.333333 128 213.333333 128c142.485333 0 208.448-34.048 305.856-146.944z"
                                            fill="#D84315"
                                        ></path>
                                        <path
                                            d="M384 298.666667c165.930667 0 243.050667 85.333333 341.333333 85.333333h76.010667l27.989333 59.328S687.808 682.666667 512 682.666667c-128 0-192-85.333333-192-85.333334s-24.896-64-106.666667-64c-106.666667 0-170.666667 234.666667-170.666666 234.666667s0-469.333333 341.333333-469.333333z"
                                            fill="#FF7043"
                                        ></path>
                                        <path
                                            d="M277.333333 426.666667a21.333333 21.333333 0 1 1-42.666666 0 21.333333 21.333333 0 0 1 42.666666 0z m64-64a21.333333 21.333333 0 1 0 0 42.666666 21.333333 21.333333 0 0 0 0-42.666666z m0 85.333333a21.333333 21.333333 0 1 0 0 42.666667 21.333333 21.333333 0 0 0 0-42.666667z"
                                            fill="#F4511E"
                                        ></path>
                                    </g>
                                </svg>
                                <h2>Normal Menu</h2>
                                <p>
                                    The menu will include chicken curry, beef
                                    hot pot, king crab, smoked pork belly and
                                    some side dishes.{" "}
                                </p>
                                <a href="">View Menu</a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="food-item">
                                {/* <i className="flaticon-cocktail"></i> */}
                                <svg
                                    viewBox="0 0 1024 1024"
                                    class="icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M426.666667 128L128 896l768-298.666667z"
                                            fill="#FFD54F"
                                        ></path>
                                        <path
                                            d="M320.021333 682.666667A106.666667 106.666667 0 0 0 213.333333 789.312c0 24.469333 8.576 46.762667 22.464 64.768l189.952-73.877333C421.056 725.653333 375.786667 682.666667 320.021333 682.666667z"
                                            fill="#FF3D00"
                                        ></path>
                                        <path
                                            d="M437.354667 394.666667m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z"
                                            fill="#FF3D00"
                                        ></path>
                                        <path
                                            d="M597.333333 426.666667c-35.306667 0-64 28.693333-64 64.042666C533.333333 525.994667 562.026667 554.666667 597.333333 554.666667s64-28.672 64-63.957334A64.064 64.064 0 0 0 597.333333 426.666667z m0 96a32 32 0 1 1-0.021333-63.978667A32 32 0 0 1 597.333333 522.666667zM341.333333 533.333333c-35.306667 0-64 28.693333-64 64.042667C277.333333 632.661333 306.026667 661.333333 341.333333 661.333333s64-28.672 64-63.957333A64.064 64.064 0 0 0 341.333333 533.333333z m0 96a32 32 0 1 1-0.021333-63.978666A32 32 0 0 1 341.333333 629.333333z"
                                            fill="#3E2723"
                                        ></path>
                                        <path
                                            d="M637.269333 693.802667a42.666667 42.666667 0 0 0-54.933333-24.96c-22.058667 8.277333-133.12 70.314667-124.864 92.373333 0.725333 1.962667 2.666667 3.413333 5.077333 4.672l175.68-68.330667c-0.32-1.237333-0.490667-2.517333-0.96-3.754666z"
                                            fill="#8D6E63"
                                        ></path>
                                        <path
                                            d="M537.365333 731.264c-10.368-32.426667-6.549333-61.717333-6.549333-61.717333 0.704-0.917333 0.725333-2.005333 0.64-3.114667a20.586667 20.586667 0 0 0-0.341333-12.608 21.333333 21.333333 0 0 0-34.752-7.850667 96.512 96.512 0 0 0-38.869334 115.242667c0.725333 1.962667 1.813333 3.669333 2.666667 5.568l79.04-30.72c-0.576-1.6-1.28-3.114667-1.834667-4.8z"
                                            fill="#8D6E63"
                                        ></path>
                                        <path
                                            d="M554.666667 610.026667s-11.434667-114.602667-128-73.450667c12.565333 119.232 128 73.450667 128 73.450667zM716.693333 533.333333s-114.624 11.413333-73.450666 128c119.232-12.586667 73.450667-128 73.450666-128z"
                                            fill="#689F38"
                                        ></path>
                                        <path
                                            d="M892.970667 580.010667c-19.776-46.485333-65.642667-182.208-166.101334-282.645334-97.728-97.792-227.008-151.552-284.394666-167.125333-17.898667-4.821333-21.866667-5.802667-28.885334 12.010667-5.717333 14.421333-21.973333 63.722667-29.994666 86.805333a58.026667 58.026667 0 0 0-2.581334 10.026667 705.962667 705.962667 0 0 1 404.288 404.8c0.533333-0.128 1.002667-0.021333 1.578667-0.213334 14.826667-4.714667 74.048-25.386667 89.770667-30.634666 15.722667-5.333333 24.277333-14.357333 16.32-33.024z"
                                            fill="#FF9800"
                                        ></path>
                                    </g>
                                </svg>
                                <h2>Kids Menu</h2>
                                <p>
                                    The menu will include mainly pizza,
                                    hamburgers, snacks and soft drinks and fruit
                                    drinks.{" "}
                                </p>
                                <a href="">View Menu</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Food End */}

            {/*  Contact Start */}
            <Contact />
            {/*  Contact End */}

            {/* Footer Start */}
            <Footer />
            {/* Footer End */}
        </Fragment>
    );
}

export default Home;
