/** @format */

import React, { Fragment } from "react";
import PageHeader from "../Components/PageHeader";
import "../assets/css/kidsMenu.css";
import { Link } from "react-router-dom";
import { FoodDisplay } from "../Components/FoodDisplay";

const foodArr = [
    {
        name: "Hamburger",
        img: "./img/menu-burger-img.jpg",
        description: [
            'Wagyu Beef',
            'Salad',
            'Tomato',
            'Cheese'
        ]
    },
    {
        name: "Pizza",
        img: "./img/menu-burger-img.jpg",
        description: [
            '1 Coca',
            '1 Sea Pizza',
        ]
    },
    {
        name: "Snacks",
        img: "./img/menu-burger-img.jpg",
        description: [
            "Random snack"
        ]
    },
    {
        name: "Soft Drinks",
        img: "./img/menu-burger-img.jpg",
        description: [
            "7 up"
        ]
    },
    {
        name: "Fruit Drinks",
        img: "./img/menu-burger-img.jpg",
        description: [
            "Orange juice"
        ]
    },
];

export default function KidsMenu() {
    return (
        <>
            <PageHeader title="KidsMenu" />
            <h1 className="kidMenu">KidsMenu</h1>
            <ul className="foodMenu">
                {/* Food Item */}
                {foodArr.map((food, i) => (
                    <FoodDisplay
                        key={i}
                        name={food.name}
                        img={food.img}
                        description={food.description}
                    />
                ))}
            </ul>
            <Link
                to="/booking"
                className="booking-btn"
            >
                Booking Now
            </Link>
        </>
    );
}
