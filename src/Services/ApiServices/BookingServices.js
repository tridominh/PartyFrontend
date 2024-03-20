import getEndpoint from "../getEndpoint";

async function CreateBooking(booking) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/Create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(booking)
    });
    return res;
}

async function GetAllBookings() {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/GetAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
    });
    return res;
}

async function GetBooking(id) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/GetById?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
    });
    return res;
}

async function GetAllOngoingBookingsByUserId(userId) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/GetAllOngoingByUserId?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
    });
    return res;
}

async function GetAllOngoingBookings() {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/GetAllOngoing`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
    });
    return res;
}

async function GetAllBookingsByUserId(userId) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/GetAllByUserId?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
    });
    return res;
}

async function GetAllPendingBookings() {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/GetAllPending`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
    });
    return res;
}

async function UpdateStatusBooking(booking) {
    //console.log(JSON.stringify(credentials))
    const res = await fetch(`${getEndpoint()}/api/Booking/UpdateStatus`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(booking)
    });
    return res;
}

export {
    CreateBooking,
    GetAllBookings,
    GetBooking,
    GetAllOngoingBookings,
    GetAllPendingBookings,
    UpdateStatusBooking,
    GetAllBookingsByUserId,
    GetAllOngoingBookingsByUserId
};
