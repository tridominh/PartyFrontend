import getEndpoint from "../getEndpoint";

export default async function GetAllPackages() {
    const res = await fetch(`${getEndpoint()}/api/Package/GetAll`, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    });

    return res;
}
