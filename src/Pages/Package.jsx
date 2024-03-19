import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import { GetAllPackages } from '../Services/ApiServices/PackageServices';

function Package(){
    const [packages, setPackages] = useState([]);
    let navigate = useNavigate();

    const fetchPackages = async () => {
        const data = await GetAllPackages();
        const json = await data.json();
        //console.log(json);
        setPackages(json);
    }

    useEffect(() => {
        fetchPackages();
    }, [])

    if(packages.length == 0){
        return (
            <Fragment>
                <PageHeader title={"Package"}/>
                <div>No Packages</div>
            </Fragment>
        )
    }
    
    return( 
        <Fragment>
            <PageHeader title={"Package"}/>
            <div>{JSON.stringify(packages)}</div>
               <table className="table host-table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Room</th>
                      <th scope="col">Party Time</th>
                      <th scope="col">Party End Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total Price</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
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
                        )
                    })}
                  </tbody>
                </table>
 
            <div>Package</div>
        </Fragment>
    );
}

export default Package;