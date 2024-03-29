import { Link, Outlet, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "../assets/css/layout.css";
import parseJwt from "../Services/parseJwt";

function Layout({ token, removeToken, role }) {
    let navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        removeToken();
        navigate("/");
    };

    return (
        <Fragment>
            <div className="navbar navbar-expand-lg bg-light navbar-light">
                <div className="container-fluid">
                    <a href="index.html" className="navbar-brand">
                        Booking <span>Party</span>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse justify-content-between"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav ml-auto">
                            {(role == "" || role == "Customer") && (
                                <Fragment>
                                    <Link
                                        to="/"
                                        className="nav-item nav-link"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/About"
                                        className="nav-item nav-link"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to="/Package"
                                        className="nav-item nav-link"
                                    >
                                        Package
                                    </Link>
                                    <Link
                                        to="/Room"
                                        className="nav-item nav-link"
                                    >
                                        Booking
                                    </Link>
                                    <Link
                                        to="/my-booking"
                                        className="nav-item nav-link"
                                    >
                                        My Booking
                                    </Link>
                                    
                                </Fragment>
                            )}

                            {role == "Host" && (
                                <Fragment>
                                    <Link
                                        to="/host/confirm-booking"
                                        className="nav-item nav-link"
                                    >
                                        Confirm Booking
                                    </Link>
                                    <Link
                                        to="/host/payment"
                                        className="nav-item nav-link"
                                    >
                                        Payment
                                    </Link>
                                </Fragment>
                            )}

                            {role == "Admin" && (
                                <Fragment>
                                    <Link
                                        to="/admin/booking"
                                        className="nav-item nav-link"
                                    >
                                        Booking
                                    </Link>
                                    <Link
                                        to="/admin/package"
                                        className="nav-item nav-link"
                                    >
                                        Packages
                                    </Link>
                                    <Link to="/admin/create-package"></Link>
                                    <Link
                                        to="/admin/room"
                                        className="nav-item nav-link"
                                    >
                                        Rooms
                                    </Link>
                                    <Link
                                        to="/admin/service"
                                        className="nav-item nav-link"
                                    >
                                        Services
                                    </Link>
                                    <Link to="/admin/create-service"></Link>
                                </Fragment>
                            )}

                            {token ? (
                                <div className="nav-item dropdown">
                                    <Link
                                        to="#"
                                        className="nav-link dropdown-toggle"
                                        data-toggle="dropdown"
                                    >
                                        {parseJwt(token).given_name}
                                    </Link>
                                    <div className="dropdown-menu">
                                        <button
                                            onClick={handleLogout}
                                            className="dropdown-item"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="nav-item nav-link">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </Fragment>
    );
}

export default Layout;

