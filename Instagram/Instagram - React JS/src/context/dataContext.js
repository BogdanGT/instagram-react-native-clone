import dataContext from './context'
import api from '../api/db'
import Cookies from 'universal-cookie';
const cookies = new Cookies()


const reducer = (state,action) => {
    switch(action.type){
        case "asd":
            return true
    }
}

const login = () => {
    return async (value,callback) => {
        const data2 = JSON.stringify(value)

        await fetch(`/auth/login` , {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body:data2
        })
        .then(response => response.json())
        .then(res => {
            cookies.set("token",res.token)
            if(res.token){
                callback()
            }
        })
    }
}

const register = () => {
    return async (value,callback) => {
        await fetch(`/auth/register` , {
            method: 'POST',
            body:value
        })
        .then(response => response.json())
        .then(res => {
            console.log(res.token)
            cookies.set("token",res.token)
            callback()
        });
    }
}

const likePost = dispatch => {
    return async (postId,token) => {
        await fetch(`/post/like/${postId}` , {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json",
                "x-auth-token" : token
            },
            body:JSON.stringify({postId})
        })
    }
}

const addComment = dispatch => {
    return async (value,token) => {
        const data = JSON.stringify(value)
        
        await fetch(`/addComment/${value.postId}` , {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json",
                "x-auth-token" : token
            },
            body:data
        })
    }
}

const deleteComment = dispatch => {
    return async (value,token) => {
        await fetch(`/comment/${value.postId}/${value.commId}` , {
            method: 'DELETE',
            headers:{
                "Content-Type" : "application/json",
                "x-auth-token" : token
            },
        })
    }
}

const followUser = dispatch => {
    return async (id,token) => {
        console.log(id)
        await fetch(`/auth/follow/${id}` , {
            method: 'GET',
            headers:{
                "Content-Type" : "application/json",
                "x-auth-token" : token
            },
        })
    }
}

const addPost = dispatch => {
    return async (data,token,callback) => {
        console.log(data)
        await fetch(`/post` , {
            method: 'POST',
            headers:{
                "x-auth-token" : token
            },
            body:data
        })
        .then(response => response.json())
        .then(res => {
            console.log(res.token)
        });
        callback()
    }
}

export const {Context,Provider} = dataContext(reducer , [] , {addPost,followUser,login,register,likePost,addComment,deleteComment})