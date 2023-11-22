import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class */

// Question: Where should I store current user's information: API Helper and/or frontend state? Will need token to make it to request headers. Decided to have token and username in api helper for the time being... also in Redux state store.
// Question: Should I return these in an array or an object? Decided to return "user" object with username and token props for the time being...

class MyGamingListApi {

    static token;
    static username;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${MyGamingListApi.token}` }
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

    static async getUsers() {
        let res = await this.request(`users/`);
        return res.users;
    }

    static async postNewUser(newUser) {
        let res = await this.request(`auth/register`, newUser, "post");
        let token = res.token;

        if (token) {
            const { username } = newUser;

            MyGamingListApi.token = token;
            MyGamingListApi.username = username;

            return { username, token };
        }
    }

    static async postUserCredentials(user) {
        let res = await this.request(`auth/login`, user, "post");
        let token = res.token;

        if (token) {
            const { username } = user;

            MyGamingListApi.token = token;
            MyGamingListApi.username = username;

            return { username, token };
        }
    }
    
    static async getUserData(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async patchUserData(userData) {
        let { username } = userData;
        delete userData.username;

        let res = await this.request(`users/${username}`, userData, "patch");
        let user = res.user;

        if (user) {
            delete user.is_admin;
            return user;
        }
    }

    static clearUserData() {
        MyGamingListApi.username = null;
        MyGamingListApi.token = null;
    }
}

export default MyGamingListApi;