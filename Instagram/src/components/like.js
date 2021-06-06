import React,{useState,useEffect,useContext, useCallback} from 'react'
import {View,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Context } from '../context/createDataContext'



const Like = (props) => {
    const [animLike,setAnimLike] = useState()
    const {likePost} = useContext(Context)
    const {postId,token,isLiked} = props

    useEffect(() => {
        setAnimLike(isLiked)
        // am facut asta pentru ca daca puneam useState(props.isLiked) imi dadea undefined si trebuie sa dau save gen
        // si asa imi face ca fix cand se randeaza sa mi dea si likeurile
    },[isLiked])
    

    return <View>
        {animLike ? <TouchableOpacity onPress={() => {setAnimLike(false);likePost(postId,token)}}>
            <Icon name="heart" size={25} style={{marginTop:5}} color="red" />
        </TouchableOpacity> : <TouchableOpacity onPress={() => {setAnimLike(true);likePost(postId,token)}}>
            <Icon name="hearto" size={25} style={{marginTop:5}}  color="black" />
        </TouchableOpacity>
        }
    </View>
}

export default Like