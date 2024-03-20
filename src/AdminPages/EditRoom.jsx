import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { GetRoomById, UpdateRoom } from "../Services/ApiServices/RoomServices";
import "./CreateRoom.css";

function EditRoom() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [roomNumber, setRoomNumber] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [roomStatus, setRoomStatus] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const [errors, setErrors] = useState({});

    const fetchRoom = async () => {
        const response = await GetRoomById(id);
        const roomData = await response.json();
        setRoom(roomData);
    };

    useEffect(() => {
        fetchRoom();
    }, []);

    useEffect(() => {
        if(room){
            setRoomNumber(room.roomNumber);
            setPrice(room.price);
            setCapacity(room.capacity);
            setRoomStatus(room.roomStatus);
        }
    }, [room]);

    const handleUpdateRoom = async (event) => {
        event.preventDefault();
        setIsUpdating(true);

        const updatedRoom = {
            roomId: id,
            roomNumber,
            price,
            capacity,
            roomStatus
        };

        const newErrors = {};
        if (!roomNumber || !price || !capacity || !roomStatus) {
            newErrors.allFields = "All fields are required";
        }
        if (!/^\d+$/.test(roomNumber)) {
            newErrors.roomNumber = "Room Number must contain only digits.";
        }
        if (!/^\d+(\.\d+)?$/.test(price) || parseFloat(price) > 2000000) {
            newErrors.price = "Price must be a number and less than or equal to 2.000.000.";
        }
        if (!/^\d+$/.test(capacity) || parseInt(capacity) > 200) {
            newErrors.capacity = "Capacity must be a number and less than or equal to 200.";
        }
        if (roomStatus.length > 50) {
            newErrors.roomStatus = "Room Status must not exceed 50 characters.";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setIsUpdating(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("roomId", id);
            formData.append("roomNumber", roomNumber);
            formData.append("price", price);
            formData.append("capacity", capacity);
            formData.append("roomStatus", roomStatus);
            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            const updatedRoomData = await UpdateRoom(formData);
            const json = await updatedRoomData.json();
            console.log(json);
            setRoom(updatedRoomData);
            setIsUpdating(false);
            alert("Room updated successfully!");
            navigate("/admin/room");
        } catch (error) {
            setIsUpdating(false);
            console.error("Error updating room:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    const handleCancel = () => {
        navigate("/admin/room");
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <Fragment>
            <PageHeader title1="Admin" title="Edit Room" />
            {room ? (
                <div className="create-room-container container">
                    <br />
                    <form onSubmit={handleUpdateRoom}>
                        <div className="form-group row">
                            <label htmlFor="roomNumber" className="col-2">Room Number:</label>
                            <input
                                type="text"
                                id="roomNumber"
                                className="form-control col-7"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                required
                            />
                            {errors.roomNumber && <span className="error-message">{errors.roomNumber}</span>}
                        </div>

                        <div className="form-group row">
                            <label htmlFor="price" className="col-2">Price (VND):</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                className="form-control col-7"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>
                        
                        <div className="form-group row">
                            <label htmlFor="capacity" className="col-2">Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                value={capacity}
                                className="form-control col-7"
                                onChange={(e) => setCapacity(e.target.value)}
                                required
                            />
                            {errors.capacity && <span className="error-message">{errors.capacity}</span>}
                        </div>

                        <div className="form-group row">
                            <label htmlFor="roomStatus" className="col-2">Room Status:</label>
                            <select
                                id="roomStatus"
                                value={roomStatus}
                                className="form-control col-7"
                                onChange={(e) => setRoomStatus(e.target.value)}
                                required
                            >
                                <option value="">Select Room Status</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Active">Active</option>
                            </select>
                            {errors.roomStatus && <span className="error-message">{errors.roomStatus}</span>}
                        </div>
                        <div className="form-group row">
                            <label htmlFor="roomImage" className="col-2">Room Image:</label>
                            <input type="file" id="roomImage" className="form-control col-7" onChange={handleImageChange} />
                            {selectedImage && (
                                <div className="image-preview-container">
                                    <p>{selectedImage.name}</p>
                                </div>
                            )}
                        </div>
                        <div className="button-container d-flex justify-content-center">
                            <button type="submit" className="btn btn-success mr-3" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update Room"}
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <p>Loading room details...</p>
            )}
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

export default EditRoom;
