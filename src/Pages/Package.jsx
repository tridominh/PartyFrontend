import React, { Fragment, useState, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import GetAllPackages from "../Services/ApiServices/PackageServices";
import LoadingSpinner from "../Components/LoadingSpinner";
import CreateButton from "../Components/LinkButton";
import { useNavigate } from "react-router-dom";

function Package() {
    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchAllPackages = async () => {
            try {
                const response = await GetAllPackages();
                const packages = await response.json();
                setPackages(packages);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPackages();
    }, []);

    if (packages.length == 0) {
        return (
            <Fragment>
                <PageHeader title1="Page" title={"Package List"} />
                <h2 className="text-center">Package List</h2>

                <div className="col-12">
                    <p>No packages found</p>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <PageHeader title={"Package"} />
            <table className="table host-table ">
                <thead>
                    <tr>
                        {/* <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Room</th>
                        <th scope="col">Party Time</th>
                        <th scope="col">Party End Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total Price</th>
                        <th scope="col"></th>
                        <th scope="col"></th> */}
                        <th scope="col">#</th>
                        <th scope="col">Package Name</th>
                        <th scope="col">Package Type</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((item) => {
                        return (
                            <tr>
                                <td>{item.packageId}</td>
                                <td>{item.packageName}</td>
                                <td>{item.packageType}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <CreateButton link="/admin/create-package" text="Create Package" />
        </Fragment>
    );
}

export default Package;
