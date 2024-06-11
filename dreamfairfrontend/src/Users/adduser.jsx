import React, { useState } from 'react';
import axios from 'axios';
import "../css/adduser.css";
import { ToastContainer, toast } from 'react-toastify';
const UserForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        role: 'User',
        address: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    
        if (name === 'password') {
            const missingRequirements = [];
            if (!/(?=.*[a-z])/.test(value)) missingRequirements.push("one lowercase letter");
            if (!/(?=.*[A-Z])/.test(value)) missingRequirements.push("one uppercase letter");
            if (!/(?=.*\d)/.test(value)) missingRequirements.push("one number");
            if (!/(?=.*[@$!%*?&])/.test(value)) missingRequirements.push("one special character");
    
            setErrors({
                ...errors,
                password: missingRequirements.length > 0 ? `Password is missing ${missingRequirements.join(", ")}` : ""
            });
        }
    };
    

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters, with one uppercase, one lowercase, one number, and one special character";
        }

        if (!formData.phone_number) {
            newErrors.phone_number = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone_number)) {
            newErrors.phone_number = "Phone number must be 10 digits";
        }

        if (!formData.first_name) newErrors.first_name = "First name is required";
        if (!formData.last_name) newErrors.last_name = "Last name is required";
        if (!formData.address) newErrors.address = "Address is required";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            axios.post('http://localhost:1977/users', formData)
                .then(response => {
                    console.log('User created:', response.data);
                    toast.success('User created successfully');
                })
                .catch(error => {
                    console.error('There was an error creating the user:', error);
                    toast.error('Error creating user');
                });
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    {errors.first_name && <p className="error">{errors.first_name}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    {errors.last_name && <p className="error">{errors.last_name}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone_number && <p className="error">{errors.phone_number}</p>}
                </div>
              
                <div className="form-group">
                    <textarea
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                    {errors.address && <p className="error">{errors.address}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Create User</button>
            </form>
            <p>Already have an account? <a href="www.google.com">Log in</a></p>
        </div>
    );
};

export default UserForm;
