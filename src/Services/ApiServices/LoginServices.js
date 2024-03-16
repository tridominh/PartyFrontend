import getEndpoint from "../getEndpoint";

async function LoginService(credentials) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(credentials)
    });
    return res;
}

export default LoginService;
