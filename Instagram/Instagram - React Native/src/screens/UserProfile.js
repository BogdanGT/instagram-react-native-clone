import React, { useContext, useEffect,useState } from 'react'
import {View,Text,Image, TouchableOpacity, FlatList, Dimensions, Button} from 'react-native'
import { Context } from '../context/createDataContext'
import { apiLink, getUserProfile,getAllPostsFromUser, getUser, getToken } from '../context/helperFunctions'

const UserProfile = (props) => {
    const {userId} = props.route.params
    const [user,setUser] = useState([])
    const [userPosts,setUserPosts] = useState([])
    const [me,setMe] = useState([])
    const [isFollowed,setIsFollowed] = useState()
    const [animFollow,setAnimFollow] = useState()
    const {followUser} = useContext(Context)
    const {width} = Dimensions.get("window")
    const [token,setToken] = useState("")

    useEffect(async () => {
        setUser(await getUserProfile(userId))
        setUserPosts(await getAllPostsFromUser(userId))
        setMe(await getUser())
        setToken(await getToken())
    },[userId])

    const followBtn = () => {
        if(animFollow){
            return <TouchableOpacity>
                <Text onPress={async () => {followUser(userId,token);setAnimFollow(false)}} style={{backgroundColor:"#19b5fe",borderRadius:5,padding:5,color:"white",alignSelf:"flex-start",margin:5}}>UNFOLLOW</Text>
            </TouchableOpacity>
        }else{
            return <TouchableOpacity>
                <Text onPress={async () => {followUser(userId,token);setAnimFollow(true)}} style={{backgroundColor:"#19b5fe",borderRadius:5,padding:5,color:"white",alignSelf:"flex-start",margin:5}}>FOLLOW</Text>
            </TouchableOpacity> 
        }
    }

    useEffect(() => {
        setAnimFollow(isFollowed)
    },[isFollowed])

    useEffect(() => {
        if(me.followedPeople){
            setIsFollowed(me.followedPeople.includes(userId))
        }
    },[me.followedPeople])

    return <View style={{backgroundColor:"white",flex:1}}>
        <View style={{flexDirection:"row"}}>
            <View>
                <Image source={{uri:`${apiLink}/images/${user.profilePhoto}`}} style={{width:80,height:80,borderRadius:100,margin:10}} />
                <Text style={{marginLeft:10}}>{user.username}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",flex:1,alignItems:"center",marginBottom:30,alignSelf:"center"}}>
                <View style={{flexDirection:"column"}}>
                    <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>{userPosts.length}</Text>
                    <Text>posts</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowers" , {userId:user._id})}>
                <View style={{flexDirection:"column"}}>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>{user.followers}</Text>
                        <Text>followers</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowed" , {userId:user._id})}>
                    <View style={{flexDirection:"column"}}>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>{user.following}</Text>
                        <Text>following</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    {followBtn()}
    <FlatList 
        numColumns={3}
        data={userPosts}
        keyExtractor={el => el._id}
        renderItem={({item}) => {
            return <View>
                <TouchableOpacity onPress={() => props.navigation.navigate("ViewPost" , {item})}>
                    <Image source={{uri:`${apiLink}/images/${item.photoName}`}} style={{width:width / 3,height:width / 3}} /> 
                </TouchableOpacity>
            </View>
        }}
    />
</View>
}

export default UserProfile