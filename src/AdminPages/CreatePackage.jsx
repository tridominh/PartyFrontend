import React, { Fragment, useState } from "react";
import CreateButton from "../Components/CreateButton";

export default function CreatePackage() {
    const [packageName, setPackageName] = useState("");
    const [packageType, setPackageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: packageName,
            type: packageType,
        };
    };

    return (
        <Fragment>
            <h2 className="text-center">Create New Package</h2>

            <form action="">
                <div className="col-12 mb-3">
                    <label htmlFor="packageName">Package Name:</label>
                    <input type="text" id="packageName" required />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="packageType">Package Type</label>
                    <input type="text" id="packageType" required />
                </div>

                <CreateButton
                    link="../admin/CreatePackage"
                    something="Package"
                />
            </form>
        </Fragment>
    );
}
