import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { GetRoomById, UpdateRoom } from "../Services/ApiServices/RoomServices";

function EditRoom() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [roomNumber, setRoomNumber] = useState("");
    const [price, setPrice] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [roomStatus, setRoomStatus] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

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

        try {
          let formData = new FormData();
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
                <div className="edit-room-container">
                    <h2>Edit Room Details</h2>
                    <form onSubmit={handleUpdateRoom}>
                        <label htmlFor="roomNumber">Room Number:</label>
                        <input
                            type="text"
                            id="roomNumber"
                            name="roomNumber"
                            defaultValue={room.roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="capacity">Capacity:</label>
                        <input
                            type="text"
                            id="capacity"
                            name="capacity"
                            onChange={(e) => setCapacity(e.target.value)}
                            defaultValue={room.capacity}
                            required
                        />
                        <br />
                        <label htmlFor="roomStatus">Room Status:</label>
                        <input
                            type="text"
                            id="roomStatus"
                            name="roomStatus"
                            onChange={(e) => setRoomStatus(e.target.value)}
                            defaultValue={room.roomStatus}
                            required
                        />
                        <br />
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                            defaultValue={room.price}
                            required
                        />
                        <br />
                        <label htmlFor="roomImage">Room Image (Optional):</label>
                        <input type="file" id="roomImage" onChange={handleImageChange} />
                        <br />
                        {selectedImage && (
                            <div className="image-preview-container">
                                <img src={URL.createObjectURL(selectedImage)} alt="Selected room image" />
                            </div>
                        )}
                        <div className="button-container">
                            <button type="submit" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update Room"}
                            </button>
                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <p>Loading room details...</p>
            )}
        </Fragment>
    );
}

export default EditRoom;
