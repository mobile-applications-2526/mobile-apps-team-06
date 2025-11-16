import { UserLoginInput, UserSignupInput } from "@/types/types"

const login = async(userLoginInput: UserLoginInput) => {
    console.log("in call")
    try {
        console.log(process.env.EXPO_PUBLIC_API_URL)
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
    console.log("in call")
    try {
        console.log(process.env.EXPO_PUBLIC_API_URL)
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

export default {
    login,
    signUp,
}