import getEndpoint from "../getEndpoint";
export default async function GetAllServices(){
    const res = await fetch(`${getEndpoint()}/api/Service/GetAllServices`, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    });
        return res;
}