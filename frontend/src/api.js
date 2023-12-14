import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Helper Class */

class MyGamingListApi {

    constructor(token = null, username = null) {
        this.token = token;
        this.username = username;
    }

    // Have a method for retrieving this user's profile? game data?

    /** Api Helper Class Data Flow:
     *  1. Create a new instance of api helper when user attempts to log in or sign up
     *  ==> if successful, add the resulting token into the class (this.token = token)
     *  ==> otherwise, let user know of error and keep token as null
     *  2. From that point onwards, have the request method reference this.token as a header
     */

    async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        console.debug("Auth:", this.username, this.token);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}` }
        const params = (method === "get")
            ? data
            : {};
        
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message: [message];
        }
    }

    async getUsers() {
        let res = await this.request(`users/`);
        return res.users;
    }

    async postNewUser(newUser) {
        let res = await this.request(`auth/register`, newUser, "post");
        let token = res.token;

        if (token) {
            const { username } = newUser;

            this.token = token;
            this.username = username;

            return { username, token };
        }
    }

    async postUserCredentials(user) {
        let res = await this.request(`auth/login`, user, "post");
        let token = res.token;
        let games = res.games;

        if (token) {
            const { username } = user;

            this.token = token;
            this.username = username;

            return { username, token, games };
        }
    }
    
    async getUserData(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    async getProfile(username) {
        let res = await this.request(`users/${username}/profile`);
        return res.user;
    }

    async patchUserData(userData) {
        let { username } = userData;
        delete userData.username;

        let res = await this.request(`users/${username}`, userData, "patch");
        let user = res.user;

        if (user) {
            delete user.is_admin;
            return user;
        }
    }

    async searchGames(searchFormData) {
        let res = await this.request(`games/search`, searchFormData, "post");
        return res.games;
    }

    async getGameData(gameId) {
        let res = await this.request(`games/${gameId}`);
        return res.game;
    }

    async addGameToList(gameId) {
        let res = await this.request(`users/${this.username}/games/${gameId}`, {}, "post");
        return res.result;
    }

    async removeGameFromList(gameId) {
        let res = await this.request(`users/${this.username}/games/${gameId}`, {}, "delete");
        return res.result;
    }

    clearUserData() {
        this.username = null;
        this.token = null;
    }
}

export default MyGamingListApi;