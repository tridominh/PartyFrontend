import React, { Fragment, useState, useEffect, useCallback } from "react";
import PageHeader from "../Components/PageHeader";
import {
    GetAllServices,
    DeleteService,
} from "../Services/ApiServices/ServiceServices";
import { Await, useNavigate } from "react-router-dom";
import "../AdminPages/Service.css";
import LinkButton from "../Components/LinkButton";

function Service() {
    const [isLoading, setIsLoading] = useState(false);
    const [Service, setService] = useState([]);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    
    const navigate = useNavigate();
    const fetchAllServices = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await GetAllServices();
            setService(response);
            return await response.json();

        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchAllServices();
    }, []);

    const handleDeleteService = async (item) => {
        if (serviceToDelete) {
            try {
                console.log(`Deleting service ${serviceToDelete.serviceId}`);

                const response = await DeleteService(item.serviceId);

                const services = await GetAllServices();
                setService(services);
            } catch (error) {
                console.error("Error deleting service:", error);
            } finally {
                setServiceToDelete(null);
                setConfirmDelete(false);
            }
        }
    };

    const confirmDeleteDialog = (
        <div className="confirm-delete-dialog">
            <p>Are you sure you want to delete this service?</p>
            <button onClick={async () =>{ await handleDeleteService(serviceToDelete); await fetchAllServices()}}>
                Yes
            </button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
        </div>
    );

    if (Service.length === 0) {
        return (
            <Fragment>
                <PageHeader title1="Page" title={"Service List"} />
                <h2>No services found</h2>
                <table></table>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <PageHeader title={"Service"} />
            {confirmDelete && confirmDeleteDialog}
            <table className="service-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Service Name</th>
                        <th scope="col">Service Price</th>
                        <th scope="col">Service Description</th>
                        <th colSpan="2" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Service.map((item) => (
                        <tr key={item.serviceId}>
                            <td>{item.serviceId}</td>
                            <td>{item.serviceName}</td>
                            <td>{item.servicePrice}</td>
                            <td>{item.description}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        setServiceToDelete(item);
                                        setConfirmDelete(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <LinkButton
                                    link={`/admin/update-service/${item.serviceId}`}
                                    text="Update"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <LinkButton link="/admin/create-service" text="Create Service" />
        </Fragment>
    );
}

export default Service;
