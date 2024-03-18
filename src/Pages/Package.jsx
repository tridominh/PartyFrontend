import React, { Fragment, useState, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import GetAllPackages from "../Services/ApiServices/PackageServices";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function Package() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [allPackages, setAllPackages] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchAllPackages = async () => {
            try {
                const response = await GetAllPackages();
                const allPackages = await response.json();
                setAllPackages(allPackages);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPackages();
    }, []);

    if (isLoading) {
        <LoadingSpinner />;
    }

    if (error) {
        return <div>Something went wrong !!! Please try again</div>;
    }
    if (allPackages.length == 0) {
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
            <PageHeader title1="Page" title={"Package List"} />
            <h2 className="text-center">Package List</h2>
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th>Package Name</th>
                        <th>Package Type</th>
                    </tr>
                </thead>
                <tbody>
                    {allPackages.map((pkg) => {
                        return (
                            <tr className="table-warning" key={pkg.packageId}>
                                <td>{pkg.packageName}</td>
                                <td>{pkg.packageType}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}
