import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';

function About(){
    let navigate = useNavigate();
    const CheckLogin = () =>{
        if(localStorage.getItem("token") != null){
        
        }else{
            navigate("/login");
        }
    }
    return( 
        <Fragment>
            <PageHeader title={"About"}/>
            <div>About</div>
        </Fragment>
    );
}

export default About;
