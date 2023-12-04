const apicalypse = require("apicalypse");
const { ACCESS_TOKEN, CLIENT_ID } = require("./secret");

const BASE_URL = "https://api.igdb.com/v4/";

const requestOptions = {
    // url, <--- !!!!!! this is the ENDPOINT. for MyGamingList, will usually be /games => "games"
    baseURL: BASE_URL,
    // data: 'fields name;', /** BODY MUST HAVE A SEMI-COLON AT END! */ <-- !!! this is the BODY (text) of the req. By default, the apicalypse query is put in the req body.
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${ ACCESS_TOKEN }`
    },
    responseType: 'json',
    timeout: 1000  
};

// const resp = await axios.request(requestOptions);
// const res = await apicalypse(requestOptions).fields('name').limit(50).request(endpoint);
// return res.status(200).json({ data: res.data });
// return res.json({ response: resp.data });