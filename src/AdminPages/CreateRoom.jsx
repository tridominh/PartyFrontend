import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { CreateRoom } from "../Services/ApiServices/RoomServices";
import getEndpoint from "../Services/getEndpoint";

function CreateRoomPage() {
  const navigate = useNavigate();

  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      setCreatingRoom(true);

      const newRoom = {
        roomNumber,
        price,
        capacity,
        roomStatus,
      };

      // Handle image upload if an image is selected
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

        const responseData = await uploadResponse.json(); // Handle potential response data
        console.log("Room and image created:", responseData);
        setErrorMsg("");
        navigate("/admin/room");
        return; // Exit the function if image upload succeeds
      }

      // If no image is selected, make the standard API call without image data
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
      <div className="create-room-container">
        <h2>Create New Room</h2>
        <form onSubmit={handleCreateRoom}>
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <br />
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          <br />
          <label htmlFor="roomStatus">Room Status:</label>
          <input
            type="text"
            id="roomStatus"
            value={roomStatus}
            onChange={(e) => setRoomStatus(e.target.value)}
            required
          />
          <br />
          <label htmlFor="roomImage">Room Image (Optional):</label>
          <input type="file" id="roomImage" onChange={handleImageChange} />
          {selectedImage && (
            <div className="image-preview-container">
              <img src={URL.createObjectURL(selectedImage)} alt="Selected room image" />
            </div>
          )}
          {errorMsg && <span className="error-message">{errorMsg}</span>}
          <div className="button-container">
            <button type="submit" disabled={creatingRoom}>
              {creatingRoom ? "Creating..." : "Create Room"}
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default CreateRoomPage;
