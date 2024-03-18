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

export async function CreatePackage(createDto) {
    const res = await fetch(`${getEndpoint()}/api/Package/Create`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createDto),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });

    return res;
}
