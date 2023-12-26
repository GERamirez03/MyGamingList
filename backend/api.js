const apicalypse = require("apicalypse").default;
// const { ACCESS_TOKEN, CLIENT_ID } = require("./secret");
const { getAccessToken, getClientId } = require("./config");

const BASE_URL = "https://api.igdb.com/v4";
const gamesEndpoint = "/games";
const gameFields = 'id,name,slug,checksum,summary,first_release_date,cover.url, platforms.name';

const requestOptions = {
    // url: endpoint, usually '/games'
    baseURL: BASE_URL,
    // data: queryString, determined by API helper methods
    method: 'post', // IGDB API uses POST requests for most of its endpoints
    headers: {
        'Accept': 'application/json',
        'Client-ID': getClientId(),
        'Authorization': `Bearer ${ getAccessToken() }`
    }, // my application's information in the IGDB registry
    responseType: 'json',
    timeout: 2000 // give IGDB API two seconds before a request times out
};

class IGDBApi {

    static async request(data) {

        requestOptions.data = data;
        console.debug("requestOptions:", requestOptions);

        try {
            return (await apicalypse(requestOptions).request(gamesEndpoint)).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async searchGames(searchTerm = "") {
        let data = `fields ${ gameFields }; search "${ searchTerm }"; limit 10;`;
        let games = await this.request(data);
        return games;
    }

    static async getGameData(gameId) {
        let data = `fields ${ gameFields }; where id = ${ gameId }; limit 1;`;
        let game = (await this.request(data))[0];
        return game;
    }
}

module.exports = IGDBApi;