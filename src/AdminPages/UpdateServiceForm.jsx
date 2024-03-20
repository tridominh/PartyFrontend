import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { UpdateService } from "../Services/ApiServices/ServiceServices";

export default function UpdateServiceForm() {
    const [packageId, setPackageId] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [description, setServiceDescription] = useState("");

    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateDto = {
            serviceId: id,
            packageId: packageId,
            serviceName: serviceName,
            servicePrice: servicePrice,
            serviceDescription: description,
        };

        const response = await UpdateService(updateDto);

        navigate("/admin/service");
    };

    return (
        <Fragment>
            <PageHeader title="Update Service" />
            <h2 className="text-center">Update Service</h2>

            <form onSubmit={handleSubmit}>
            <div className="col-12 mb-3">
                    <label for="packageId">Package ID:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="packageId"
                        name="packageId"
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                        required
                    />
                </div>
                <div className="col-12 mb-3">
                    <label for="serviceName">Service Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="serviceName"
                        name="serviceName"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                    />
                </div>
                <div className="col-12 mb-3">
                    <label for="servicePrice">Service Price</label>
                    <input
                        className="form-control"
                        type="text"
                        id="servicePrice"
                        name="servicePrice"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        required
                    />
                </div>
                
                <div className="col-12 mb-3">
                    <label for="description">Service Description</label>
                    <input
                        className="form-control"
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </Fragment>
    );
}