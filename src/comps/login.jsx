import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { config } from '../config';

export default function Login() {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const showSuccessSwal = (data) => {
        withReactContent(Swal).fire({
            title: 'Logged in successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            nav('/');
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            email: email,
            password: password
        };

        try {
            let result = await axios.post(`${config.api}/users/login`, user);
            let data = result.data;
            let token = data.token;
            localStorage.setItem('token', token);
            showSuccessSwal();
        } catch (error) {
            if (error.response.status === 404) {
                withReactContent(Swal).fire({
                    title: 'User not found',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            } else if (error.response.status === 401) {
                withReactContent(Swal).fire({
                    title: 'Invalid password',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            } else {
                withReactContent(Swal).fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

        }
    }

    return (
        <div className="welcome d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1 className="display-4">Login</h1>
            <form className="reg-window d-flex flex-column justify-content-around p-3 rounded rounded-5 h-75 w-75" onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <div className="row justify-content-around mt-2">
                        <div className="col-sm-5">
                            <label className='float-end' style={{ fontSize: "35px" }} htmlFor="email">Email:</label>
                        </div>
                        <div className="p-0 col-sm-6">
                            <input
                                type="email"
                                required={true}
                                className="my-2 w-75 form-control"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 justify-content-around">
                        <div className="col-sm-5">
                            <label className='float-end' style={{ fontSize: "35px" }} htmlFor="password">Password:</label>
                        </div>
                        <div className="p-0 col-sm-6">
                            <input
                                type="password"
                                required={true}
                                className="my-2 w-75 float-start form-control"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center row text-center">
                    <button type="submit" className="loginBtn btn btn-info w-50 fs-4 rounded rounded-5">Login</button>
                    <Link to="/register" className="text-decoration-none">Click here to register </Link>
                </div>
            </form>
        </div>
    )
}
