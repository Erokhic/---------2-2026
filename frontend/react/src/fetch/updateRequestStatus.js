export async function updateRequestStatus(requestId, newStatusId) {
    const response = await fetch(`http://localhost:3000/api/requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_status: newStatusId
        })
    })
    return await response.json()
}