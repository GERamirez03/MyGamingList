const apicalypse = require("apicalypse").default;
const { ACCESS_TOKEN, CLIENT_ID } = require("./secret");

const BASE_URL = "https://api.igdb.com/v4";
const gamesEndpoint = "/games";
const coversEndpoint = "/covers";
const gameFields = 'id,name,slug,checksum,summary,first_release_date,cover';
const coverFields = 'id,game,url,height,width';

const requestOptions = {
    // url: endpoint, usually '/games'
    baseURL: BASE_URL,
    // data: queryString, determined by API helper methods
    method: 'post', // IGDB API uses POST requests for most of its endpoints
    headers: {
        'Accept': 'application/json',
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${ ACCESS_TOKEN }`
    }, // my application's information in the IGDB registry
    responseType: 'json',
    timeout: 2000 // give IGDB API two seconds before a request times out
};

class IGDBApi {

    static async request(data, endpoint = gamesEndpoint) {

        requestOptions.data = data;
        console.debug("requestOptions:", requestOptions);

        try {
            return (await apicalypse(requestOptions).request(endpoint)).data;
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

    static async getCoverData(coverId) {
        let data = `fields ${ coverFields }; where id = ${ coverId }; limit 1;`;
        let cover = (await this.request(data, coversEndpoint))[0];
        return cover;
    }

    static async getGameCover(gameId) {
        let data = `fields ${ coverFields }; where game = ${ gameId }; limit 1;`;
        let cover = (await this.request(data, coversEndpoint))[0];
        return cover;
    }
}

module.exports = IGDBApi;