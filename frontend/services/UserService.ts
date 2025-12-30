import { UserLoginInput, UserSignupInput } from "@/types/types"
import getToken from "@/utils/Token"

const login = async(userLoginInput: UserLoginInput) => {
    try {
        // console.log(process.env.EXPO_PUBLIC_API_URL)
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userLoginInput)
        })
        return response
    } catch (e) {
        console.error("Error logging in user: " + e)
    }
}

const signUp = async(userSignupInput: UserSignupInput) => {
    try {
        // console.log(process.env.EXPO_PUBLIC_API_URL)
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userSignupInput)
        })
        return response
    } catch (e) {
        console.error("Error signing up user: " + e)
    }
}

const fetchUserProfile = async() => {
    try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getToken()
            }
        })
        return response
    } catch (e) {
        console.error("Error trying to get user profile " + e)
    }
}

const fetchUserProfileByUsername = async(username: string) => {
    try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/profile/" + username , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getToken()
            }
        })
        return response
    } catch (e) {
        console.error("Error trying to get user profile by username " + e)
    }
}

const checkAuth = async() => {
    try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/auth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getToken()
            }
        })
        return response
    } catch (e) {
        console.error("Error trying to get auth " + e)
    }
}

export default {
    login,
    signUp,
    fetchUserProfile,
    fetchUserProfileByUsername,
    checkAuth,
}