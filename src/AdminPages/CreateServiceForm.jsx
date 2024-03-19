import React, { Fragment, useState } from "react";
import PageHeader from "../Components/PageHeader";
import { CreateService } from "../Services/ApiServices/ServiceServices";
import { useNavigate } from "react-router-dom";

export default function CreateServiceForm() {
    const [packageId, setPackageId] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [desciption, setServiceDesciption] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createDto = {
            packageId: packageId,
            serviceName: serviceName,
            servicePrice: servicePrice,
            desciption: desciption,
        };

        const response = await CreateService(createDto);

        navigate("/admin/service");
    };

    return (
        <Fragment>
            <PageHeader title="Create Service" />
            <h2 className="text-center">Create New Service</h2>

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
                    <label for="desciption">Service Description</label>
                    <input
                        className="form-control"
                        type="text"
                        id="desciption"
                        name="desciption"
                        value={desciption}
                        onChange={(e) => setServiceDesciption(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </Fragment>
    );
}