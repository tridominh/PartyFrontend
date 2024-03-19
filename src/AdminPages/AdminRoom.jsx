import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import RoomCarousel from '../Components/RoomCarousel';
import { GetAllRooms, DeleteRoom } from '../Services/ApiServices/RoomServices';
import useToken from '../Services/useToken';
import './room.css';

function AdminRoom(){
    let navigate = useNavigate();

    const CheckLogin = () =>{
        if(useToken().token != null){
        
        }else{
            navigate("/login");
        }
    };

    const [rooms, setRooms] = useState(null);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const fetchData = useCallback(async () => {
        const data = await GetAllRooms();
        const json = await data.json();
        console.log(json);
        setRooms(json);
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const handleDeleteRoom = async () => {
        if (roomToDelete) {
          try {
            console.log(`Deleting room ${roomToDelete.roomId}`);
      
            const response = await DeleteRoom(roomToDelete.roomId);
            if (response.status === 200) {
              console.log(`Room ${roomToDelete.roomId} deleted successfully.`);
              setRooms(prevRooms => prevRooms.filter(room => room.roomId !== roomToDelete.roomId));
            } else {
              console.error(`Error deleting room ${roomToDelete.roomId}:`, response);
            }
          } catch (error) {
            console.error('Error deleting room:', error);
          } finally {
            fetchData();
            setConfirmDelete(false);
          }
        }
      }
      

    const confirmDeleteDialog = (
        <div className="confirm-delete-dialog">
            <p>Are you sure?</p>
            <button onClick={handleDeleteRoom}>Yes</button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
        </div>
    );

    if(!rooms) return (
        <Fragment>
            <PageHeader title={"Room"}/>
            <div>Loading...</div>
        </Fragment>
    )

    return( 
        <Fragment>
            <PageHeader title={"Room"}/>
            {confirmDelete && confirmDeleteDialog}
            <div className="food">
                <div className="create-room-btn">
                    <Link className='room-book-btn' to="/admin/create-room">Create</Link> 
                </div>
                <br>
                </br>
                <br></br>
                <div className='row align-items-center'>
                    {rooms.map(room => {  
                        return (
                            <div className="col-md-4" key={room.roomId}>
                                <div className="food-item">
                                    <RoomCarousel room={room}/>
                                    <h2>{room.roomNumber}</h2>
                                    <strong className='room-price-text'>{`Price: $${room.price}`}</strong>
                                    <strong className='room-price-text'>{`Status: ${room.roomStatus}`}</strong>
                                    <strong className='room-price-text'>{`Capacity: ${room.capacity}`}</strong>
                                    <br></br>
                                    <Link className='room-book-btn' to={`/admin/edit-room/${room.roomId}`}>Update</Link> 
                                    <Link className='room-book-btn' onClick={() => {setRoomToDelete(room); setConfirmDelete(true);}}>Delete</Link>
                                    <Link className='room-book-btn' to={`/Booking/${room.roomId}`}>View</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default AdminRoom;
