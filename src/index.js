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
import Service from "./Pages/Service";
// import KidsMenu from "./Pages/KidsMenu";
// import NormalMenu from "./Pages/NormalMenu";
// import VegetarianMenu from "./Pages/VegetarianMenu";
import PrivateRoute from "./Services/PrivateRoute";
import parseJwt from "./Services/parseJwt";
import AdminBooking from "./AdminPages/Booking";
import AdminPackage from "./AdminPages/Package";
import ConfirmBooking from "./HostPages/ConfirmBooking";
import Room from "./Pages/Room";
import HostPayment from "./HostPages/HostPayment";
import Payment from "./Pages/Payment";
import MyBooking from "./Pages/MyBooking";
import PackagesPage from "./Pages/Packages";
import AdminRoom from "./AdminPages/AdminRoom";
import EditRoom from "./AdminPages/EditRoom";
import PaymentComplete from "./Pages/PaymentCompleted";
import UpdatePackageForm from "./AdminPages/UpdatePackageForm";
import CreatePackageForm from "./AdminPages/CreatePackageForm";
import UpdateServiceForm from "./AdminPages/UpdateServiceForm";
import CreateServiceForm from "./AdminPages/CreateServiceForm";
import { CreateRoom } from "./Services/ApiServices/RoomServices";
import CreateRoomPage from "./AdminPages/CreateRoom";
import KidsMenu from "./Pages/NormalMenu";
import Menu from "./Pages/KidsMenu";

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
                    {/* <Route path="package" element={<Package />} /> */}
                    <Route path="package" element={<PackagesPage />} />
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
                                <Package/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin/create-package"
                        element={
                            <PrivateRoute role="Admin">
                                <CreatePackageForm/>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="admin/update-package/:id"
                        element={
                            <PrivateRoute role="Admin">
                                <UpdatePackageForm/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin/room"
                        element={
                            <PrivateRoute role="Admin">
                                <AdminRoom />
                            </PrivateRoute>
                        }
                    />
                    <Route path="admin/edit-room" element={<EditRoom />}>
                        <Route path=":id" element={<EditRoom />} />
                    </Route>
                    <Route
                        path="admin/create-room"
                        element={
                            <PrivateRoute role="Admin">
                                <CreateRoomPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin/service"
                        element={
                            <PrivateRoute role="Admin">
                                <Service/>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="admin/create-service"
                        element={
                            <PrivateRoute role="Admin">
                                <CreateServiceForm/>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="admin/update-service/:id"
                        element={
                            <PrivateRoute role="Admin">
                                <UpdateServiceForm/>
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
                    <Route path="menu/:id" element={<Menu />} />
                    <Route path="normalMenu" element={<KidsMenu />} />
                    {/* <Route path="vegetarianMenu" element={<VegetarianMenu />} /> */}
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
