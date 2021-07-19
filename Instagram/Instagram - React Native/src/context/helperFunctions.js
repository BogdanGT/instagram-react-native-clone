import KeyChain from 'react-native-keychain'
import api from "../api/api"

let glToken;

export const getToken = async () => {
    const token = await KeyChain.getGenericPassword()
    glToken = JSON.parse(token.password)
    return JSON.parse(token.password)
}

export const getAllPosts = async () => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }
    const res = await api.get("/post" , config)
    return res.data
}

export const getUser = async () => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }
    const res = await api.get("/auth/user" , config)
    return res.data.user
}

export const getAllPostsFromUser = async (id) => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }
    console.log(id)
    const res = await api.get(`/post/user/${id}` , config)
    return res.data.allPosts
}

export const getAllPostsFromFollowed = async () => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }
    const res = await api.get("/getFollowedPosts" , config)
    return res.data.foundUser
}

export const getFollowing = async (id) => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }
    const res = await api.get(`/auth/getFollowing/${id}` , config)
    return res.data
}

export const getFollowers = async (id) => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }
    const res = await api.get(`/auth/getFollowers/${id}` , config)
    return res.data
}

export const getUserProfile = async (id) => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }
    const res = await api.get(`/auth/user/${id}` , config)
    return res.data.user
}

export const apiLink = "http://192.168.0.220:8000"