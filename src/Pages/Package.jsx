import React, { Fragment, useState, useEffect } from "react";

import PageHeader from "../Components/PageHeader";
import {GetAllPackages, DeletePackage} from "../Services/ApiServices/PackageServices";
import LoadingSpinner from "../Components/LoadingSpinner";
import CreateButton from "../Components/LinkButton";
import { useNavigate } from "react-router-dom";
import "../AdminPages/Package.css";

function Package() {
    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [packageToDelete, setPackageToDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);

        const fetchAllPackages = async () => {
            try {
                const response = await GetAllPackages();
                setPackages(response);
            } catch (error) {
                console.error("Error fetching packages:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPackages();
    }, []);

    const handleDeletePackage = async (item) => {
        if (packageToDelete) {
            try {
                console.log(`Deleting package ${packageToDelete.packageId}`);

                const response = await DeletePackage(item.packageId);

                const packages = await GetAllPackages();
                setPackages(packages);

                // setPackages((prevPackages) =>
                //     prevPackages.filter(
                //         (pkg) => pkg.packageId !== packageToDelete.packageId
                //     )
                // );
            } catch (error) {
                console.error("Error deleting package:", error);
            } finally {
                setPackageToDelete(null);
                setConfirmDelete(false);
            }
        }
    };

    const confirmDeleteDialog = (
        <div className="confirm-delete-dialog">
            <p>Are you sure you want to delete this package?</p>
            <button onClick={() => handleDeletePackage(packageToDelete)}>
                Yes
            </button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
        </div>
    );

    return (
        <Fragment>
            <PageHeader title={"Package"} />
            {confirmDelete && confirmDeleteDialog}

            <table className="package-table">
                {" "}
                {}
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Package Name</th>
                        <th scope="col">Package Type</th>
                        <th scope="col">Action</th> {}
                    </tr>
                </thead>
                <tbody>
                    {packages.map((item) => (
                        <tr key={item.packageId}>
                            <td>{item.packageId}</td>
                            <td>{item.packageName}</td>
                            <td>{item.packageType}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        setPackageToDelete(item);
                                        setConfirmDelete(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <CreateButton link="/admin/create-package" text="Create Package" />
        </Fragment>
    );
}

export default Package;
