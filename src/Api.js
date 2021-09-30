import axios from "axios"

const BASE_URL = process.env.CINEMA_APP_BASE_URL || "http://localhost:3001"

class CinemaApi {
    static token

    static async request(endpoint, data = {}, method = "get") {
        console.log(`API Call: ${method} request sent to ${url} \n Payload: ${data}`)

        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${CinemaApi.token}` }
        const params = (method === "get") 
            ? data 
            : {}
        
        try {
            const result = await axios({ url, method, data, params, headers })
            return result.data
        }

        catch(e) {
            console.error(`API Error: ${e.response}`)
            let message = e.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }
    
    /**
     *  Register New User
     */

    static async register(data) {
        let res = await this.request('auth/register', data, "post")
        return res
    }

    static async login(data) {
        let res = await this.request(`auth/login`, data, "post")
        return res
    }

    static async getProfile(userID) {
        let res = await this.request(`users/${userID}`)
        return res
    }

    static async editProfile(userID, data) {
        let res = await this.request(`users/${userID}`, data, "patch")
        return res
    }

    static async deleteProfile(userID) {
        let res = await this.request(`users/${userID}`, null, "delete")
        return res
    }

    static async getUserReviews(userID) {
        let res = await this.request(`users/${userID}/reviews`)
        return res
    }

    static async getFollowedUsers(userID) {
        let res = await this.request(`/users/${userID}/following`)
        return res
    }

    static async getFollowers(userID) {
        let res = await this.request(`/users/${userID}/followers`)
        return res
    }

    static async followUser(userID, userToFollowID) {
        let res = await this.request(`users/${userID}/following`, {userToFollowID}, "post")
        return res
    }
}