const apicalypse = require("apicalypse").default;
const { ACCESS_TOKEN, CLIENT_ID } = require("./secret");

const BASE_URL = "https://api.igdb.com/v4";
const gamesEndpoint = "/games";

/** TODO: Refactor this code into an API Helper class for IGDB specifically. */

const requestOptions = {
    // url, <--- !!!!!! this is the ENDPOINT. for MyGamingList, will usually be /games => "games"
    // url: gamesEndpoint,
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

async function getTenGames() {
    try {
        const res = await apicalypse(requestOptions).fields('name').limit(10).request(gamesEndpoint);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

async function searchGames(searchTerm = "") {
    try {
        const res = await apicalypse(requestOptions).fields('id,name,slug,checksum').limit(10).search(searchTerm).request(gamesEndpoint);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

async function getGameData(slug) {
    try {
        const res = await apicalypse(requestOptions).fields('id,name,slug,checksum,summary,first_release_date').where(`slug = "${ slug }"`).limit(1).request(gamesEndpoint);
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
}

async function getGameDataById(gameId) {
    try {
        const res = await apicalypse(requestOptions).fields('id,name,slug,checksum,summary,first_release_date').where(`id = ${ gameId }`).limit(1).request(gamesEndpoint);
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getTenGames, searchGames, getGameData, getGameDataById };