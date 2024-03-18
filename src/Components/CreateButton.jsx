import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatePackage from "../AdminPages/CreatePackage";

export default function CreateButton({ link, something }) {
    const navigate = useNavigate();
    return (
        <Link to={link}>
            <button
                onClick={() => navigate(link)}
                type="submit"
                className="btn btn-primary"
            >
                Create {something}
            </button>
        </Link>
    );
}
