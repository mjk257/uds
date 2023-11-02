const searchForCities = async (body: any) => {
    const response = await fetch('/api/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    return await response.json();
}

const getAllOccupations = async () => {
    const response = await fetch('http://localhost:5000/api/jobs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return await response.json();
}

export {
    searchForCities,
    getAllOccupations
}