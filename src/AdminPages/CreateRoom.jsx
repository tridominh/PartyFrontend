import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { CreateRoom } from "../Services/ApiServices/RoomServices";

function CreateRoomPage() {
  const navigate = useNavigate();

  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
          {errorMsg && <span className="error-message">{errorMsg}</span>}
          <div className="button-container">
            <button type="submit" disabled={creatingRoom}>
              {creatingRoom ? "Creating..." : "Create Room"}
            </button>
            <button type="button" onClick={() => navigate("/admin/room")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default CreateRoomPage;
