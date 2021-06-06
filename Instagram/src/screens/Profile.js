import React,{useEffect,useState} from 'react'
import {View,Text,Image, FlatList, TouchableOpacity,Dimensions} from 'react-native'
import {apiLink,getUser,getAllPostsFromUser} from '../context/helperFunctions'

const {width} = Dimensions.get("window")

const Profile = (props) => {
    const [user,setUser] = useState([])
    const [userPosts,setUserPosts] = useState([])

    useEffect(async () => {
        setUser(await getUser())
    },[])

    useEffect(async () =>{
        setUserPosts(await getAllPostsFromUser(user._id))
    },[user])
    
    return <View>
        <Text>{user.username}</Text>
        <Image source={{uri:`${apiLink}/images/${user.profilePhoto}`}} style={{width:100,height:100,borderRadius:100}} />
        <Text>{user.email}</Text>
        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Text>{userPosts.length} posts</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowers" , {userId:user._id})}>
                <Text>{user.followers} urmaritori</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowed" , {userId:user._id})}>
                <Text>{user.following} urmariri</Text>
            </TouchableOpacity>
        </View>
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

export default Profile