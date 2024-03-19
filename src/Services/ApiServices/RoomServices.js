import { json } from "react-router-dom";
import getEndpoint from "../getEndpoint";
import useToken from "../useToken";

async function GetAllRooms() {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Room/GetAllRooms`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            //"Authorization": `Bearer ${useToken().token}`,
        },
    });
    return res;
}

async function CreateRoom(room) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Room/CreateRoom`, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
            //"Authorization": `Bearer ${useToken().token}`,
        },
        body:JSON.stringify(room)
    });
    return res;
}

async function GetRoomById(id) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Room/GetRoomById?id=${id}`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            //"Authorization": `Bearer ${useToken().token}`,
        },
    });
    return res;
}

async function UpdateRoom(room) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Room/UpdateRoom`, {
        method: 'PUT',
        headers: {
            "accept": "text/plain",
            // "Authorization": `Bearer ${useToken().token}`,
        },
        body:room
    });
    return res;
}

async function DeleteRoom(id) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Room/DeleteRoom?id=${id}`, {
        method: 'DELETE',
        headers: {
            "accept": "text/plain",
            // "Authorization": `Bearer ${useToken().token}`,
        },
    });
    return res;
}

export { GetAllRooms, GetRoomById, UpdateRoom, DeleteRoom, CreateRoom};
