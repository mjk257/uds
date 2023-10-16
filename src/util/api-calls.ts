const searchForCities = async (body: any) => {
    console.log(body);
    const response = await fetch('/api/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    return await response.json();
}

export {
    searchForCities
}