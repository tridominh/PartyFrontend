import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Packages } from "./PackagesData";
import PageHeader from '../Components/PageHeader';
import { PackageDisplay } from '../Components/PackageDisplay';

function Package(){
    let navigate = useNavigate();
    const CheckLogin = () =>{
        if(localStorage.getItem("token") != null){
        
        }else{
            navigate("/login");
        }
    }
    const [packages, setPackages] = useState([])
    useEffect(() => {

    })
    return( 
        <Fragment>
            <PageHeader title={"Package"}/>
            <h1 className="kidMenu">Packages</h1>
            <PackageDisplay foodPack={Packages} />
        </Fragment>
    );
}

export default Package;
