import getEndpoint from "../getEndpoint";

async function CreateMomoLink(options) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/momo/CreateMomoLink`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(options)
    });
    return res;
}

async function ChangeBookingStatusAfterPayment(options) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Payment/ChangeBookingStatusAfterPayment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(options)
    });
    return res;
}

async function ConfirmPayment(options) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Payment/ConfirmPayment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(options)
    });
    return res;
}

export {
    CreateMomoLink,
    ChangeBookingStatusAfterPayment,
    ConfirmPayment
}
