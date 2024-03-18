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
    }
    , [room])
  
    
    
    //const description = document.getElementById("description").getAttribute("value");
    
    const handleUpdateRoom = async (event) => {
      event.preventDefault();
      
      console.log(room.roomNumber);
      console.log(room.price);
        console.log(room.capacity);
        console.log(room.roomStatus);
      
      const updatedRoom = {
        roomId: id,
        roomNumber: roomNumber, 
        price: price, 
        capacity: capacity, 
        roomStatus: roomStatus
        // description: description,
      };
      console.log(updatedRoom);
  
      setIsUpdating(true); 
  
      try {
        const updatedRoomData = await UpdateRoom(updatedRoom);
        const json = await updatedRoomData.json();
        console.log(json);
        setRoom(updatedRoomData);
        setIsUpdating(false); 
        alert("Room updated successfully!"); 
        navigate("/rooms"); 
      } catch (error) {
        setIsUpdating(false); 
        console.error("Error updating room:", error);
        alert("An error occurred. Please try again later."); 
      }
    };
  
    const handleCancel = () => {
      navigate("/admin/room"); 
    };
  
    return (
      <Fragment>
        <PageHeader title1="Admin" title2="Edit Room" />
        {room ? (
          <div className="edit-room-container">
            <h2>Edit Room Details</h2>
            <form onSubmit={handleUpdateRoom}>
              {/* Form fields to capture updated room details (replace with actual inputs) */}
              <label htmlFor="roomNumber">Room Number:</label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                defaultValue={room.roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
              <br></br>
              <label htmlFor="capacity">Capacity:</label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                onChange={(e) => setCapacity(e.target.value)}
                defaultValue={room.capacity}
                required
              />
              <br></br>
              <label htmlFor="roomStatus">Room Status:</label>
              <input
                type="text"
                id="roomStatus"
                name="roomStatus"
                onChange={(e) => setRoomStatus(e.target.value)}
                defaultValue={room.roomStatus}
                required
              />
              <br></br>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={room.price}
                required
              />
              <br></br>
              {/* <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                defaultValue={room.description}
                required
              /> */}
              {/* ... other form fields for price, capacity, roomStatus */}
  
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