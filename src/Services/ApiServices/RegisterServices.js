import getEndpoint from "../getEndpoint";

async function RegisterService(credentials) {
    console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/user/Register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(credentials)
    });
    return res;
}

export default RegisterService;
