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

export default GetAllRooms;
