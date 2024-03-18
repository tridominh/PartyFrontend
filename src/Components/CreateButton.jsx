import React from "react";
import { Link } from "react-router-dom";

export default function CreateButton() {
    return (
        <Link to={link}>
            <button type="button" className="btn btn-primary">
                Create {something}
            </button>
        </Link>
    );
}
