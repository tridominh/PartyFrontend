import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./login.css";
import LoadingSpinner from "../Components/LoadingSpinner";
import LoginService from "../Services/ApiServices/LoginServices";
import RegisterService from "../Services/ApiServices/RegisterServices";
import parseJwt from "../Services/parseJwt";

function Login({ setToken }) {
    let navigate = useNavigate();
    //login variable
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    //register variable
    const [nameRegister, setNameRegister] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [errorMessageRegister, setErrorMessageRegister] = useState("");

    async function loginUser(credentials) {
        //console.log(JSON.stringify(credentials))
        setIsLoading(true);
        let res;
        try {
            res = await LoginService(credentials);

            if (!res.ok) {
                const errorData = await res.text();
                throw new Error(errorData || "Unknown error occurred");
            }

            // Handle successful response data
            setErrorMessage("");
            setIsLoading(false);
            // const data = await res.json();
            // process the data as needed
        } catch (err) {
            setErrorMessage(err.message);
            setIsLoading(false);
            return;
            // Handle errors
        }
        //console.log(await res.json());
        return await res.json();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await loginUser({
            email,
            password,
        });
        if (!user) return;
        setToken(user.token);
        const role = parseJwt(user.token).role;
        if (role == "Customer") {
            navigate("/");
        } else if (role == "Admin") {
            navigate("/admin/booking");
        } else if (role == "Host") {
            navigate("/host/confirm-booking");
        } else {
        }
    };

    async function registerUser(credentials) {
        //console.log(JSON.stringify(credentials))
        setIsLoading(true);
        let res;
        try {
            res = await RegisterService(credentials);

            if (!res.ok) {
                const errorData = await res.text();
                throw new Error(errorData || "Unknown error occurred");
            }

            // Handle successful response data
            setErrorMessageRegister("");
            setIsLoading(false);
            // const data = await res.json();
            // process the data as needed
        } catch (err) {
            setErrorMessageRegister(err.message);
            setIsLoading(false);
            return;
            // Handle errors
        }
        //console.log(await res.json());
        return await res.json();
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const user = await registerUser({
            name: nameRegister,
            email: emailRegister,
            password: passwordRegister,
        });
        if (!user) return;
        setToken(user.token);
        navigate("/");
    };

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            <div className="d-flex justify-content-center align-items-center">
                <div className="card login-card">
                    <ul
                        className="nav login-nav-pills nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="login-nav-item nav-item text-center">
                            <a
                                className="nav-link active btl login-btl"
                                id="pills-home-tab"
                                data-toggle="pill"
                                href="#pills-home"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                            >
                                Login
                            </a>
                        </li>
                        <li className="login-nav-item nav-item text-center">
                            <a
                                className="nav-link btr login-btr"
                                id="pills-profile-tab"
                                data-toggle="pill"
                                href="#pills-profile"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                            >
                                Signup
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                        >
                            <div className="login-form form px-4 pt-5">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name=""
                                        className="form-control"
                                        placeholder="Email or Phone"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                    <input
                                        type="password"
                                        name=""
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    {errorMessage && (
                                        <div className="text-danger">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn login-btn-dark btn-dark btn-block"
                                        disabled={isLoading}
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <div className="login-form form px-4">
                                <form onSubmit={handleRegisterSubmit}>
                                    <input
                                        type="text"
                                        name=""
                                        className="form-control"
                                        placeholder="Name"
                                        onChange={(e) =>
                                            setNameRegister(e.target.value)
                                        }
                                    />

                                    <input
                                        type="text"
                                        name=""
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setEmailRegister(e.target.value)
                                        }
                                    />

                                    {/*<input type="text" name="" className="form-control" placeholder="Phone" onChange={(e) => e.setPass}/>*/}

                                    <input
                                        type="password"
                                        name=""
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setPasswordRegister(e.target.value)
                                        }
                                    />

                                    {errorMessageRegister && (
                                        <div className="text-danger">
                                            {errorMessageRegister}
                                        </div>
                                    )}
                                    <button className="btn login-btn-dark btn-dark btn-block">
                                        Signup
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;
