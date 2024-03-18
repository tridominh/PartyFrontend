import React, { Fragment, useState, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import GetAllPackages from "../Services/ApiServices/PackageServices";

export default function Package() {
    const [allPackages, setAllPackages] = useState([]);

    useEffect(() => {
        const fetchAllPackages = async () => {
            const response = await GetAllPackages();
            const allPackages = await response.json();
            setAllPackages(allPackages);
        };

        fetchAllPackages();
    }, []);

    if (allPackages.length == 0) {
        return (
            <Fragment>
                <PageHeader title1="Page" title={"Package List"} />
                <h2>Package List</h2>

                <table></table>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <PageHeader title1="Page" title={"Package List"} />
            <h2>Package List</h2>

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
