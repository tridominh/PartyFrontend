import getEndpoint from "../getEndpoint";
import useToken from "../useToken";

async function GetAllPackages() {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Package/GetAll`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            //"Authorization": `Bearer ${useToken().token}`,
        },
    });
    return res;
}

export default GetAllPackages;
