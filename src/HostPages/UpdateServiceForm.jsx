import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UpdateService } from '../Services/ApiServices/ServiceServices';

 function UpdateServiceForm({ service }) {
    const [updatedService, setUpdatedService] = useState(service);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedService({ ...updatedService, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UpdateService(updatedService);
            history.push('/services');
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="serviceName">Service Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="serviceName"
                    name="serviceName"
                    value={updatedService.serviceName}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="servicePrice">Service Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="servicePrice"
                    name="servicePrice"
                    value={updatedService.servicePrice}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={updatedService.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Update Service</button>
        </form>
    );
}

export default UpdateServiceForm;
