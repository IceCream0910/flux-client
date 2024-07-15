async function callAPI(body) {
    const response = await fetch('https://api.cobalt.tools/api/json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
}

export default callAPI;