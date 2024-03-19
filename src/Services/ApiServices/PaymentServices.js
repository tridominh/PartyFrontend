import getEndpoint from "../getEndpoint";

async function CreateMomoLink() {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/momo/CreateMomoLink`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },

    });
    return res;
}

export {
    CreateMomoLink
}
