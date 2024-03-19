import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Booking from "./Pages/Booking";
import NotFound from "./Pages/NotFound";
import Login from './Pages/Login';
import "@fortawesome/fontawesome-free/css/all.min.css";
import useToken from "./Services/useToken";
import About from "./Pages/About";
import Package from "./Pages/Package";
import KidsMenu from "./Pages/KidsMenu";
import NormalMenu from "./Pages/NormalMenu";
import VegetarianMenu from "./Pages/VegetarianMenu";
import PrivateRoute from "./Services/PrivateRoute";
import parseJwt from "./Services/parseJwt";
import AdminBooking from "./AdminPages/Booking";
import AdminPackage from "./AdminPages/Package";
import ConfirmBooking from "./HostPages/ConfirmBooking";
import Room from "./Pages/Room";
import HostPayment from "./HostPages/HostPayment";
import Payment from "./Pages/Payment";
import MyBooking from "./Pages/MyBooking";
import PaymentComplete from "./Pages/PaymentCompleted";

export default function App() {
    const { token, setToken, removeToken } = useToken();
    const role = token ? parseJwt(token).role : "";

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout
                            token={token}
                            removeToken={removeToken}
                            role={role}
                        />
                    }
                >
                    {/*User pages*/}
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="room" element={<Room />} />
                    <Route path="package" element={<Package />} />
                    <Route path="booking" element={<Booking />}>
                        <Route path=":id" element={<Booking />} />
                    </Route>
                    <Route path="my-booking" element={<MyBooking />} />
                    <Route path="payment" element={<Payment />}>
                        <Route path=":payType/:id" element={<Payment />} />
                    </Route>
                    <Route path="payment-completed" element={<PaymentComplete/>} />
                    {/*Admin pages*/}
                    <Route
                        path="admin/booking"
                        element={
                            <PrivateRoute role="Admin">
                                <AdminBooking />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin/package"
                        element={
                            <PrivateRoute role="Admin">
                                <AdminPackage />
                            </PrivateRoute>
                        }
                    />
                    {/*Host pages*/}
                    <Route
                        path="host/confirm-booking"
                        element={
                            <PrivateRoute role="Host">
                                <ConfirmBooking />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="host/payment"
                        element={
                            <PrivateRoute role="Host">
                                <HostPayment />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                    <Route path="kidsMenu" element={<KidsMenu />} />
                    <Route path="normalMenu" element={<NormalMenu />} />
                    <Route path="vegetarianMenu" element={<VegetarianMenu />} />
                </Route>
                <Route path="login" element={<Login setToken={setToken} />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
