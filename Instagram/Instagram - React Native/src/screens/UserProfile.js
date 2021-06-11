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
    },[])

    const followBtn = () => {
        if(animFollow){
            return <Button title="UNFOLLOW" onPress={async () => {followUser(userId,token);setAnimFollow(false)}} />
        }else{
            return <Button title="FOLLOW" onPress={async () => {followUser(userId,token);setAnimFollow(true)}} />
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

    return <View>
    <Text>{user.username}</Text>
    <Image source={{uri:`${apiLink}/images/${user.profilePhoto}`}} style={{width:100,height:100,borderRadius:100}} />
    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
        <Text>{userPosts.length} posts</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowers" , {userId:user._id,meId:me._id})}>
                <Text>{user.followers} urmaritori</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowed" , {userId:user._id,meId:me._id})}>
                <Text>{user.following} urmariri</Text>
            </TouchableOpacity>
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