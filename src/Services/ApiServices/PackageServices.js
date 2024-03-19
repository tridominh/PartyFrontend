import getEndpoint from "../getEndpoint";

export default async function GetAllPackages() {
    const res = await fetch(`${getEndpoint()}/api/Package/GetAll`, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    });

    return res.json();
}

export async function CreatePackage(createDto) {
    const res = await fetch(`${getEndpoint()}/api/Package/Create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createDto),
    });

    return res.json();
}

export async function UpdatePackage(updateDto) {
    const res = await fetch(`${getEndpoint()}/api/Package/Update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDto),
    });

    return res.json();
}

export async function DeletePackage(id) {
    const res = await fetch(`${getEndpoint()}/api/Package/Delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    });

    return res.json();
}
