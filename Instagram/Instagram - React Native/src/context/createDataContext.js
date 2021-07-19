import createDataContext from './context'
import api from '../api/api'
import KeyChain from 'react-native-keychain'
import { io } from 'socket.io-client'

const reducer = (state,action) => {
    switch(action.type){
        case "register":
            return [...state , {title:"asdasdasd"}]
        case "sendPhoto":
            // console.log(action.payload)
            return [...state , {filename:action.payload}]
    }
}

const register = dispatch => {
    return async (value,callback) => {
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }

            await api.post("/auth/register",value,config).then(async (res) => {
                const token = JSON.stringify(res.data.token)
                await KeyChain.setGenericPassword("token",token)
            })
            callback()
            dispatch({type:"register"})
        } catch (error) {
            console.log(error.message)
        }
    }
}

const login = dispatch => {
    return async  (value, callback) => {
        try {
            const config = {
                headers:{
                    "Content-Type" : "application/json"
                }
            }
            const data = JSON.stringify(value)

            await api.post("/auth/login" , data,config).then(async res => {
                const token = JSON.stringify(res.data.token)
                await KeyChain.setGenericPassword("token",token)
                callback()
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

const addPost = dispatch => {
    return (value, token,cb) => {
        const config = {
            headers: {
                "Content-Type" :"application/json",
                "x-auth-token" : token
            }
        }
        console.log(token)
        const data = JSON.stringify(value)
        api.post("/post" , value, config)
        cb()
    }
}

const likePost = dispatch => {
    return (id, token) => {
        const config = {
            headers: {
                "Content-Type" :"application/json",
                "x-auth-token" : token
            }
        }
        const data = JSON.stringify({id})

        api.post(`/post/like/${id}` ,data, config)
    }
}

const followUser = dispatch => {
    return (id, token) => {
        const config = {
            headers: {
                "Content-Type" :"application/json",
                "x-auth-token" : token
            }
        }

        api.get(`/auth/follow/${id}` , config)
    }
}

const addComment = dispatch => {
    return (value, token) => {
        const config = {
            headers: {
                "Content-Type" :"application/json",
                "x-auth-token" : token
            }
        }

        const data = JSON.stringify(value)

        api.post(`/addComment/${value.postId}` ,data, config)
    }
}

const deleteComment = dispatch => {
    return (value, token) => {
        const config = {
            headers: {
                "Content-Type" :"application/json",
                "x-auth-token" : token
            }
        }


        api.delete(`/comment/${value.postId}/${value.commentId}`, config)
    }
}

const deletePost = dispatch => {
    return (id,token,cb) => {
        const config = {
            headers: {
                "Content-Type" :"application/json",
                "x-auth-token" : token
            }
        }


        api.delete(`/post/${id}`, config)
        cb()
    }
}


const sendPhotoConv = dispatch => {
    return (data,userId,myPhoto,meId,token,cb,convIndex) => {
        const config = {
            headers: {
                "Content-Type" :"application/json",
                "x-auth-token" : token
            }
        }

        // console.log(userId,file)
        // const data = {userId,file}


        api.post(`/auth/sendPhotoConv`,data, config).then(res => {
            socket = io("http://192.168.0.220:4000")

            // socket.emit("send-message" , {
            //     userTo:userId,
            //     image:res.data.filename,
            //     photo:myPhoto,
            //     meId,
            //     convIndex
            // })
            cb(res.data.filename)
        })
    }

}

export const {Context,Provider} = createDataContext(reducer, [] , {sendPhotoConv,deletePost ,deleteComment,addComment,register,login,addPost,likePost,followUser})