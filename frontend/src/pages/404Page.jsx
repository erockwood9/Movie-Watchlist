import React from "react";
import { Link } from "react-router";

export const NotFoundPage = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            <h1 className="display-4">404</h1>
            <p className="lead">Page Not Found</p>
            <Link to="/" className="btn btn-primary mt-5">
            Go Back To Movie-Watchlist
            </Link>
        </div>
    );
};