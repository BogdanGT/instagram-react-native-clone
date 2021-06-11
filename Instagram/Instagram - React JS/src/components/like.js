import { useState,useContext, useEffect } from 'react';
import '../App.css';
import {Context} from '../context/dataContext'
import {getToken,getPosts,apiLink} from '../context/helperFunctions'
import {AiFillHeart,FaComment,AiOutlineHeart} from 'react-icons/all'

function Like (props) {
    const token = getToken()
    const {likePost} = useContext(Context)
    const {isLiked,postId} = props
    const [animLike,setAnimLike] = useState()

    useEffect(() => {
        setAnimLike(isLiked)
    },[isLiked])

  return (
    <div>
        {animLike ? <AiFillHeart onClick={() => {likePost(postId , token);setAnimLike(false)}} color="red" size={40} /> : <AiOutlineHeart onClick={() => {likePost(postId , token);setAnimLike(true)}} color="black" size={40}/>}
    </div>
  );
}

export default Like;
