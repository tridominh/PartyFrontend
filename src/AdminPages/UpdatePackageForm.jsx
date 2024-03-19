import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { UpdatePackage } from "../Services/ApiServices/PackageServices";

export default function UpdatePackageForm() {
    const [packageName, setPackageName] = useState("");
    const [packageType, setPackageType] = useState("");

    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateDto = {
            packageId: id,
            packageName: packageName,
            packageType: packageType,
        };

        const response = await UpdatePackage(updateDto);

        navigate("/admin/package");
    };

    return (
        <Fragment>
            <PageHeader title="Update Package" />
            <h2 className="text-center">Update Package</h2>

            <form onSubmit={handleSubmit}>
                <div className="col-12 mb-3">
                    <label for="packageName">Package Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="packageName"
                        name="packageName"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                        required
                    />
                </div>
                <div className="col-12 mb-3">
                    <label for="packageType">Package Type</label>
                    <input
                        className="form-control"
                        type="text"
                        id="packageType"
                        name="packageType"
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
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
