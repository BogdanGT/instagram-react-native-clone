import React,{useEffect,useState,useContext} from 'react'
import {View,Text,Image, TouchableOpacity} from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import {apiLink,getToken,getUser} from '../context/helperFunctions'
import Like from '../components/like'
import { Context } from '../context/createDataContext'


const ViewPost = (props) => {
    const {item} = props.route.params
    let isLiked;
    const [token,setToken] = useState([])
    const [user,setUser] = useState([])
    const {followUser,deletePost} = useContext(Context)
    const [isFollowed,setIsFollowed] = useState()
    const [animFollow,setAnimFollow] = useState()

    useEffect(async () => {
        setToken(await getToken())
        setUser(await getUser())
    },[])

    useEffect(() => {
        if(user.followedPeople){
            setIsFollowed(user.followedPeople.includes(item.user._id))
        }
    },[user.followedPeople])


    useEffect(() => {
        setAnimFollow(isFollowed)
    },[isFollowed])




    const followBtn = () => {
        if(item.user._id != user._id){
            if(animFollow){
                return <TouchableOpacity onPress={async () => {followUser(item.user._id,token);setAnimFollow(false)}}>
                    <Text style={{backgroundColor:"#19b5fe",borderRadius:5,padding:5,color:"white",fontWeight:"bold"}}>UNFOLLOW</Text>
                </TouchableOpacity>
            }else{
                return <TouchableOpacity onPress={async () => {followUser(item.user._id,token);setAnimFollow(true)}}>
                    <Text style={{backgroundColor:"#19b5fe",borderRadius:5,padding:5,color:"white",fontWeight:"bold"}}>FOLLOW</Text>
                </TouchableOpacity>
            }
        }else{
            return null
        }
    }

    const checkUser = () => {
        if(user._id != item.user._id){
            props.navigation.navigate("UserProfile" , {userId:item.user._id})
        }else{
            props.navigation.navigate("Profile" , {userId:item.user._id})
        }
    }

    return <View style={{marginTop:30}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginRight:10}}>
            <View style={{flexDirection:"row",marginHorizontal:10,marginVertical:5}}>
                <Image source={{uri:`${apiLink}/images/${item.user.profilePhoto}`}} style={{width:35,height:35,backgroundColor:"black",borderRadius:25}} />
                <TouchableOpacity style={{alignSelf:"center"}} onPress={() => checkUser()}>
                    <Text style={{marginLeft:5,fontWeight:"bold"}}>{item.user.username}</Text>
                </TouchableOpacity>
            </View>
            {followBtn()}
            {item.user._id == user._id && <TouchableOpacity onPress={() => deletePost(item._id ,token , () => props.navigation.navigate("Profile"))}>
                <Text style={{backgroundColor:"red",borderRadius:5,padding:5,color:"white",fontWeight:"bold"}}>DELETE</Text>
            </TouchableOpacity> 
            }
            
        </View>
        <Image source={{uri:`${apiLink}/images/${item.photoName}`}} style={{backgroundColor:"white",width:null,height:300}} />
        <View style={{flexDirection:"row",marginHorizontal:10,alignItems:"center"}}>
            {user.likedPosts ? isLiked = user.likedPosts.includes(item._id) : null}
            <Like isLiked={isLiked} postId={item._id} token={token} />
            <TouchableOpacity onPress={() => props.navigation.navigate("AddComment" , {postId:item._id,comments:item.comments,userId:user._id})}>
                <Icon2 name="comment-o" size={25} style={{marginLeft:10}} />
            </TouchableOpacity>
        </View>
        <Text style={{marginLeft:10,fontFamily:"Roboto-Bold"}}>{item.description}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("WhoLikes" , {whoLikes : item.whoLikes})}>
            <Text style={{marginLeft:10,fontFamily:"Roboto-Bold"}}>{item.like} aprecieri</Text>
        </TouchableOpacity>
    </View>
}

export default ViewPost