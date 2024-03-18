import React, { Fragment, useState, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import GetAllServices from "../Services/ApiServices/ServiceServices";

export default function Serivce() {
    const [allServices, setAllServices] = useState([]);

    useEffect(() => {
        const fetchAllServices = async () => {
            const response = await GetAllServices();
            const allServices = await response.json();
            setAllServices(allServices);
        };

        fetchAllServices();
    }, []);

    if (allServices.length == 0) {
        return (
            <Fragment>
                <PageHeader title1="Page" title={"Service List"} />
                <h2>Service List</h2>

                <table></table>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <PageHeader title1="Page" title={"Service List"} />
            <h2>Service List</h2>

            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th>Service Name</th>
                        <th>Service Price</th>
                        <th>Description</th> 
                    </tr>
                </thead>

                <tbody>
                    {allServices.map((ser) => {
                        return (
                            <tr className="table-warning" key={ser.serviceId}>
                                <td>{ser.serviceName}</td>
                                <td>{ser.servicePrice}</td>
                                <td>{ser.description}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}