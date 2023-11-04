import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class */

// ESSENTIAL QUESTION: Store user info in api helper class or frontend state? Thinking in frontend state; keep api helper class STATIC!
// Question: Should I return these in an array or an object?

// IMPLEMENT TOKEN !!!

class MyGamingListApi {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${MyGamingListApi.token}` } // IMPLEMENT TOKEN
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
            return [username, token];
        }
    }

    static async postUserCredentials(user) {
        let res = await this.request(`auth/login`, user, "post");
        let token = res.token;

        if (token) {
            const { username } = user;
            return [username, token];
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
}

export default MyGamingListApi;