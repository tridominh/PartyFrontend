import React, { Fragment, useState } from "react";
import CreateButton from "../Components/CreateButton";
import PageHeader from "../Components/PageHeader";
import { CreatePackage } from "../Services/ApiServices/PackageServices";

export default function CreatePackageForm() {
    const [packageName, setPackageName] = useState("");
    const [packageType, setPackageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createDto = {
            packageName,
            packageType,
        };

        console.log(createDto);

        const response = await CreatePackage(createDto).then(
            console.log("New Package added")
        );
        console.log(response);
    };

    return (
        <Fragment>
            <PageHeader title="Create Package" />
            <h2 className="text-center">Create New Package</h2>

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

                <CreateButton link="/admin/package" something="Package" />
            </form>
        </Fragment>
    );
}
