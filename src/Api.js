import axios from "axios"

const BASE_URL = process.env.CINEMA_APP_BASE_URL || "http://localhost:3001"

class CinemaApi {
    static token

    static async request(endpoint, data = {}, method = "get") {
        console.debug(`API Call: ${method} request sent to ${endpoint} \n Payload: ${data}`)

        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${CinemaApi.token}` } 
        const params = (method === "get") 
            ? data 
            : {}
        
        console.debug(`PARAMS: ${params} \n DATA ${data}`)


            const result = await axios({ url, method, data, params, headers })
            return result.data
        

        // catch(e) {
        //     console.error(`API Error: ${e.response}`)
        //     let message = e.response.data.error.message
        //     throw Array.isArray(message) ? message : [message]
        // }
    }


    /**
     *  USER METHODS
     */
    
    /**
     *  Register New User
     *  data should be 
     *  { username, password, firstName, lastName, email, bio }
     */

    static async register(data) {
        let res = await this.request('auth/register', data, "post")
        return res
    }

    /**
     *  Login existing user.
     *  data is { username, password }
     */

    static async login(data) {
        let res = await this.request(`auth/login`, data, "post")
        return res
    }

    /**
     *  Get information on a single user 
     */
    static async getProfile(userID) {
        let res = await this.request(`users/${userID}`)
        return res
    }

    static async getByUsername(username) {
        let res = await this.request(`users/${username}`)
        return res
    }

    /**
     *  Allows a user to edit their own profile information
     *  Request must have a JWT on it and the JWT must match the user in the params
     *  Accepts { firstName, lastName, email, bio }
     */
    static async editProfile(userID, data) {
        let res = await this.request(`users/${userID}`, data, "patch")
        return res
    }

    /**
     *  Allows a user to delete their own account
     *  Must have a JWT and it must match the user in Params
     */
    static async deleteProfile(userID) {
        let res = await this.request(`users/${userID}`, null, "delete")
        return res
    }

    /**
     *  Retrieve all reviews a user has written
     */
    static async getUserReviews(userID) {
        let res = await this.request(`users/${userID}/reviews`)
        return res
    }

    /**
     *  Get all users that are followed by a given user
     */
    static async getFollowedUsers(userID) {
        let res = await this.request(`users/${userID}/following`)
        return res
    }

    /**
     *  Get all followers for a user
     */
    static async getFollowers(userID) {
        let res = await this.request(`users/${userID}/followers`)
        return res
    }

    /* 
     *   Follow a user
     */
    static async followUser(userID, userToFollowID) {
        let res = await this.request(`users/${userID}/following`, {userToFollowID}, "post")
        return res
    }

    /* 
     *   Unfollow A user
     */
    static async unfollowUser(userID, userToUnfollowID) {
        let res = await this.request(`users/${userID}/following`, {userToUnfollowID}, "delete")
        return res
    }

    /**
     *  Get all the reviews a user has liked
     */
    static async getLikedReviews(userID) {
        let res = await this.request(`users/${userID}/likes`)
        return res
    }

    /**
     * Like a review
     */
    static async likeReview(userID, reviewID) {
        let res = await this.request(`users/${userID}/likes`, {reviewID}, "post")
        return res
    }

    /**
     *  Remove a review from a users likes
     */
    static async unlikeReview(userID, reviewID) {
        let res = await this.request(`users/${userID}/likes`, { reviewID }, "delete")
        return res
    }

    /**
     * 
     * Given a logged in user's ID, 
     * get posts for their homepage
     */

    static async getHomepagePosts(userID) {
        let res = await this.request(`users/${userID}/following/posts`)
        return res
    }

    /**
     *  MOVIE METHODS
     */

    /**
     *  SEARCH FOR MOVIES/TV
     *  Takes multiple params, including:
     *  s: this is your search term.
     *  y: this is the year of release for the media you're searching for, if you have a specific one. Type: number
     *  type: differentiate between media types. accepts three different string values ["movie", "series", "episode"]
     *  page: number of page for result. type: number. If no argument is passed, defaults to one.
     */
    static async searchMovies(data) {
        console.log(data)
        let res = await axios.get(`${BASE_URL}/movies/search`,
        {params: data})
        return res
    }

    /**
     * Given a valid IMDB id, return all details about that media
     */
    static async getMovie(id) {
        let res = await this.request(`movies/${id}`)
        return res
    }

    /**
     *  REVIEW METHODS
     */

    /**
     *  Given it's ID, retrieve a single review 
     */
    static async getReview(id) {
        let res = await this.request(`reviews/${id}`)
        return res
    }

    static async getMediaReviews(imdbID) {
        let res = await this.request(`movies/${imdbID}/reviews`)
        return res
    }

    /** Given a payload of data from a form,
     *  create a review.
     *  User must provide a valid jwt.
     *  Data must look like this:
     *  { movieID, userID, rating, title, body }
     *  movieID must yield a valid movie/series from the API
     *  userID must match the user on the JWT
     *  rating minimum is 1, maximum is 10
     *  title cannot exceed 100 characters
     *  body cannot exceed 500 characters
     */
    static async postReview(data) {
        let res = await this.request(`reviews/`, data, "post")
        return res
    }

    /**
     *  Given a payload of data, update a review
     *  can be given { rating, title, body } to update,
     *  all are technically optional
     *  As with creation, user must pass a token to update a review, and that token must match the original poster of the review
     * 
     */

    static async updateReview(data, revID) {
        let res = await this.request(`reviews/${revID}`, data, "patch")
        return res
    }

    /* 
    this also follows all the above rules, except deletes a review forever.
    */
    static async deleteReview(revID) {
        let res = await this.request(`reviews/${revID}`, null, "delete")
        return res
    }
}

CinemaApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld25ldyIsInVzZXJJRCI6MTAsImlhdCI6MTYzNDMxNzA4NH0.sgI3OoHQkfl_rnjhdEZQkc-1Qosq8YhLTXsW7mMVzYY"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyYW5kX29sZCIsImlhdCI6MTYzNDMxNjc5N30.Lq2zbBJv2dM6HinzesNjfkU8HFIc1eF9KRh7hTg08W8"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyYW5kX25ldyIsImlhdCI6MTYzNDE4MDM4OH0.M3IOtzaiF3EHTqIRTdCxG9Bw-ZaH7rWoNfb0-2f1d6A"

export default CinemaApi