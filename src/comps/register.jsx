import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './fileUpload';
import config from '../config';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState('');
    const [fileSelected, setFileSelected] = useState('');

    const handleFileChange = (file) => {
        setFileSelected(file);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', username);
        formData.append('age', age);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('city', city);
        formData.append('file', fileSelected);

        axios.post(`${config.api}/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <div className="welcome d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1 className="display-4">Register</h1>
            <form className="reg-window p-3 rounded rounded-5 h-75 w-75" onSubmit={handleSubmit}>
                <div className='d-flex h-75'>
                    <div className='p-3 col-md-6'>
                        <div className=" my-3 form-group">
                            <label style={{ fontSize: "25px" }} htmlFor="email">Email:</label>
                            <input
                                type="email"
                                required={true}
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="my-3 form-group">
                            <label style={{ fontSize: "25px" }} htmlFor="username">Username:</label>
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div style={{ fontSize: "25px" }} className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                required={true}
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div className="p-3 col-md-6 form-group">
                        <div className=' my-3'>
                            <label style={{ fontSize: "25px" }} htmlFor="city">City:</label>
                            <input
                                type="text"
                                required={true}
                                className="form-control"
                                id="city"
                                value={city}
                                onChange={handleCityChange}
                            />
                        </div>
                        <label style={{ fontSize: "25px" }} htmlFor="age">Age:</label>
                        <input
                            type="number"
                            required={true}
                            className="form-control"
                            id="age"
                            value={age}
                            onChange={handleAgeChange}
                        />
                        <div className="my-5 float-end">
                            <FileUpload handleFileChange={handleFileChange} />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-info w-50 fs-4 rounded rounded-5">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
