import getEndpoint from "../getEndpoint";

export async function GetAllServices() {
    const res = await fetch(`${getEndpoint()}/api/Service/GetAllServices`, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    });

    return res.json();
}

export async function CreateService(createDto) {
    const res = await fetch(`${getEndpoint()}/api/Service/CreateService`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createDto),
    });

    return res.json();
}

export async function UpdateService(updateDto) {
    const res = await fetch(`${getEndpoint()}/api/Service/UpdateService`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDto),
    });

    return res.json();
}

export async function DeleteService(id) {
    const res = await fetch(`${getEndpoint()}/api/Service/DeleteService/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    });

    return res.json();
}