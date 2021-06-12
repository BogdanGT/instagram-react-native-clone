import Cookies from 'universal-cookie'

const cookie = new Cookies()
const glToken = cookie.get("token")

export const getToken = () => {
    return cookie.get("token")
}

export const getPosts = async (token) => {

    const data = await fetch(`/post` , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "x-auth-token" : token
        }
    })
    .then(response => response.json())
    .then(res => res.allPost);


    return data
}

export const getUser = async (token) => {
    const data = await fetch(`/auth/user` , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "x-auth-token" : token
        }
    })
        .then(response => response.json())
        .then(res => res.user);
    return data
}


export const getAllPostsFromUser = async (id,token) => {
    const data = await fetch(`/post/user/${id}` , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "x-auth-token" : token
        }
    })
    .then(response => response.json())
    .then(res => res.allPosts)
    .catch(err => console.log(err))

    return data
}
export const getFollowing = async (id,token) => {
    console.log("following")
    const data = await fetch(`/auth/getFollowing/${id}` , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "x-auth-token" : token
        }
    })
        .then(response => response.json())
        .then(res => res);
    
    return data
}

export const getFollowers = async (id,token) => {
    console.log("followers")
    const data = await fetch(`/auth/getFollowers/${id}` , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "x-auth-token" : token
        }
    })
        .then(response => response.json())
        .then(res => res);
    return data

}

export const getUserById = async (id) => {
    const config = {
        headers:{
            "x-auth-token":glToken
        }
    }

    const data = await fetch(`/auth/user/${id}` , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "x-auth-token" : glToken
        }
    })
        .then(response => response.json())
        .then(res => res.user);

    return data
}

export const getFollowedPosts = async (token) => {
    const data = await fetch(`/getFollowedPosts` , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "x-auth-token" : token
        }
    })
    .then(response => response.json())
    .then(res => res.foundUser);

    return data
}

export const apiLink = "http://localhost:8000"