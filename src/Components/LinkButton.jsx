import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({ link, text = "button-text" }) {
    return (
        <Link to={link}>
            <button type="submit" className="btn btn-primary">
                {text}
            </button>
        </Link>
    );
}
