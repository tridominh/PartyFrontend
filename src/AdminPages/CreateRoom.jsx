import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { CreateRoom } from "../Services/ApiServices/RoomServices";
import getEndpoint from "../Services/getEndpoint";
import "./CreateRoom.css";

function CreateRoomPage() {
  const navigate = useNavigate();

  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [errors, setErrors] = useState({});

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    if (!roomNumber || !price || !capacity || !roomStatus) {
      setErrorMsg("All fields are required");
      return;
    }

    const newErrors = {};
  if (!/^\d+$/.test(roomNumber)) {
    newErrors.roomNumber = "Room Number must contain only digits.";
  }
  if (!/^\d+(\.\d+)?$/.test(price) || parseFloat(price) > 2000000) {
    newErrors.price = "Price must be a number and less than or equal to 2.000.000VNĐ.";
  }
  if (!/^\d+$/.test(capacity) || parseInt(capacity) > 200) {
    newErrors.capacity = "Capacity must be a number and less than or equal to 200.";
  }
  if (roomStatus.length > 50) {
    newErrors.roomStatus = "Room Status must not exceed 50 characters.";
  }
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

    try {
      setCreatingRoom(true);

      const newRoom = {
        roomNumber,
        price,
        capacity,
        roomStatus,
      };

      if (selectedImage) {
        const formData = new FormData();
        formData.append("roomNumber", newRoom.roomNumber);
        formData.append("price", newRoom.price);
        formData.append("capacity", newRoom.capacity);
        formData.append("roomStatus", newRoom.roomStatus);
        formData.append("image", selectedImage);

        for(var pair of formData.entries()){
          console.log(pair[0]+ ', ' +pair[1]);
        }

        const uploadResponse = await fetch(`${getEndpoint()}/api/Room/CreateRoom`, {
          method: "POST",
          headers: {
            // "Authorization": `Bearer ${useToken().token}`, // Uncomment if required
            'accept': 'text/plain',
            //  'Content-Type': '/form-data; boundary=--14737809831466499882746641449'
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Error uploading image: ${uploadResponse.statusText}`);
        }

        const responseData = await uploadResponse.json();
        console.log("Room and image created:", responseData);
        setErrorMsg("");
        navigate("/admin/room");
        return;
      }

      const response = await CreateRoom(newRoom);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Unknown error occurred");
      }

      setErrorMsg("");
      navigate("/admin/room");
    } catch (error) {
      setErrorMsg(error.message || "An error occurred while creating the room");
    } finally {
      setCreatingRoom(false);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    } else {
      setSelectedImage(null);
    }
  };

  const handleCancel = () => {
    navigate("/admin/room");
  };

  return (
    <Fragment>
      <PageHeader title1="Admin" title="Create Room" />
      <div className="create-room-container container">
        <br></br>
        <form onSubmit={handleCreateRoom}>
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
            {errorMsg && <span className="error-message">{errorMsg}</span>}
          </div>
          <div className="button-container d-flex justify-content-center">
            <button type="submit" className="btn btn-success mr-3" disabled={creatingRoom}>
              {creatingRoom ? "Creating..." : "Create Room"}
            </button>
            <button type="button" className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default CreateRoomPage;