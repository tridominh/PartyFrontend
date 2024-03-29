import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Packages } from "./PackagesData";
import PageHeader from '../Components/PageHeader';
import { PackageDisplay } from '../Components/PackageDisplay';
import "../assets/css/kidsMenu.css"

function PackagesPage(){
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
            <br>
            </br>
            <br></br>
            <PackageDisplay foodPack={Packages} />
            {/* Footer Start */}
        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="footer-contact">
                                    <h2>Our Address</h2>
                                    <p><i class="fa fa-map-marker-alt"></i>FPT University HCMC</p>
                                    <p><i class="fa fa-phone-alt"></i>+098 765 4321</p>
                                    <p><i class="fa fa-envelope"></i>birthdayparty@gmail.com</p>
                                    <div class="footer-social">
                                        <a href=""><i class="fab fa-twitter"></i></a>
                                        <a href=""><i class="fab fa-facebook-f"></i></a>
                                        <a href=""><i class="fab fa-youtube"></i></a>
                                        <a href=""><i class="fab fa-instagram"></i></a>
                                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="footer-link">
                                    <h2>Quick Links</h2>
                                    <a href="">Terms of use</a>
                                    <a href="">Privacy policy</a>
                                    <a href="">Help</a>
                                    <a href="">FQAs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright">
                <div class="container">
                    <p>Copyright &copy; <a href="/">Birthday Party For Kids</a>, All Right Reserved.</p>
                </div>
            </div>
        </div>
        {/* Footer End */}
        </Fragment>
    );
}

export default PackagesPage;