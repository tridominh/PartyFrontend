/** @format */

import React, { Fragment, useState } from "react";
import PageHeader from "../Components/PageHeader";
import "../assets/css/kidsMenu.css";
import { Link } from "react-router-dom";
import { FoodDisplay } from "../Components/FoodDisplay";
import { Packages } from "./PackagesData";
import { useParams } from "react-router-dom";

export default function Menu() {
    const { id } = useParams();
    const getMenu = () => {
        const menu = Packages.find((menu) => menu.id === id);
        return menu;
    }
    const [menu, setMenu] = useState(getMenu())
    return (
        <>
            <PageHeader title={menu.name} />
            <h1 className="kidMenu">{menu.name}</h1>
            <FoodDisplay menu={menu.menu} />
            <Link
                to="/booking"
                className="booking-btn"
            >
                Booking Now
            </Link>
        </>
    );
}
