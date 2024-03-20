import React, { Fragment, useState } from "react";
import CreateButton from "../Components/LinkButton";
import PageHeader from "../Components/PageHeader";
import { CreatePackage } from "../Services/ApiServices/PackageServices";
import { useNavigate } from "react-router-dom";

export default function CreatePackageForm() {
    const [packageName, setPackageName] = useState("");
    const [packageType, setPackageType] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createDto = {
            packageName: packageName,
            packageType: packageType,
        };

        const response = await CreatePackage(createDto);

        navigate("/admin/package");
    };

    return (
        <Fragment>
            <PageHeader title="Create Package" />
            <h2 className="text-center">Create New Package</h2>

            <form onSubmit={handleSubmit}>
                <div className="col-12 mb-3">
                    <label for="packageName">Package Name</label>
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
                    Create
                </button>
            </form>
        </Fragment>
    );
}