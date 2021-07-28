async function loadData() {
    let response = await axios.get("carpark-rates.csv");
    // csv object is available from csvtojson package
    let json = await csv().fromString(response.data);
    return transformData(json);
}

