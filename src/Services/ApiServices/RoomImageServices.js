import { json } from "react-router-dom";
import getEndpoint from "../getEndpoint";
import useToken from "../useToken"; 

async function UploadRoomImage(roomId, imageData) {
  const formData = new FormData();
  formData.append("roomId", roomId);
  formData.append("image", imageData);
  const res = await fetch(`${getEndpoint()}/api/Room/CreateRoom`, {
    method: 'POST',
    headers: {
      //"Authorization": `Bearer ${useToken().token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Error uploading image: ${res.statusText}`);
  }

  const response = await res.json();
  console.log('Room image uploaded:', response);
  return response;
}

async function GetRoomImages(roomId) {
  const res = await fetch(`${getEndpoint()}/api/Room/GetRoomImages?roomId=${roomId}`, {
    method: 'GET',
    headers: {
      "accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching room images: ${res.statusText}`);
  }

  const images = await res.json(); 
  console.log('Room images retrieved:', images);
  return images;
}

async function DeleteRoomImage(imageId) {
  const res = await fetch(`${getEndpoint()}/api/Room/DeleteRoomImage?imageId=${imageId}`, {
    method: 'DELETE',
    headers: {
      //"Authorization": `Bearer ${useToken().token}`, // Uncomment if required
    },
  });

  if (!res.ok) {
    throw new Error(`Error deleting room image: ${res.statusText}`);
  }

  console.log('Room image deleted');
}

async function UpdateRoomImages(roomId) {
  const res = await fetch(`${getEndpoint()}/api/Room/GetRoomImages?roomId=${roomId}`, {
    method: 'GET',
    headers: {
      "accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching room images: ${res.statusText}`);
  }

  const images = await res.json(); 
  console.log('Room images retrieved:', images);
  return images;
}

export { UploadRoomImage, GetRoomImages, DeleteRoomImage, UpdateRoomImages };
